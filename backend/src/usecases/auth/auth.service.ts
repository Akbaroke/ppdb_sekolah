import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/domain/user/user.service';
import {
  TMessageWithEmail,
  TMessageWithToken,
  TMessageWithIPayloadToken,
  TMessageLogin,
} from './auth.interface';
import { HashingService } from 'src/infrastucture/hashing/hashing.service';
import { EntityManager } from 'typeorm';
import { NodemailerService } from 'src/infrastucture/email/nodemailer.service';
import { OtpService } from 'src/domain/otp/otp.service';
import { TokenService } from 'src/domain/token/token.service';
import { TYPE_OTP } from 'src/domain/otp/otp.interface';
import { User } from 'src/domain/user/user.entity';
import { Otp } from 'src/domain/otp/otp.entity';
import { IMessage } from '../message.interface';
import { BlacklistService } from './blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly userService: UserService,
    private readonly emailService: NodemailerService,
    private readonly hashingService: HashingService,
    private readonly otpService: OtpService,
    private readonly tokenService: TokenService,
    private readonly blackListTokenService: BlacklistService,
  ) {}

  async register(email: string, password: string): Promise<TMessageWithEmail> {
    try {
      const existingUser = await this.findUserByEmail(email);

      if (existingUser) {
        throw new ConflictException('Email sudah terdaftar');
      }

      const hashPassword = await this.hashingPassword(password);
      await this.transactionRegister(email, hashPassword);

      return {
        email,
        message: 'Verifikasi akun terlebih dahulu',
        httpStatus: HttpStatus.CREATED,
      };
    } catch (error) {
      throw error;
    }
  }

  async verificationOTP(
    email: string,
    otp: string,
    type_otp: TYPE_OTP,
  ): Promise<TMessageWithEmail & { token?: string }> {
    let token: string;
    try {
      const isValidOtp = await this.validateOtp(email, otp, type_otp);

      if (!isValidOtp) {
        throw new UnauthorizedException('Otp tidak sah');
      }

      const user = await this.findUserByEmail(email);
      await this.entityManager.transaction(async (entityManager) => {
        if (type_otp === TYPE_OTP.REGISTER) {
          await Promise.all([
            this.consumeOtpAndTransaction(email, entityManager),
            this.verifyUserAndTransaction(user, entityManager),
          ]);
        } else {
          await this.consumeOtpAndTransaction(email, entityManager);
          token = await this.tokenService.generateTokenForgotPassword({
            id: user.user_id,
            email,
          });
        }
      });

      const message = {
        email,
        httpStatus: HttpStatus.OK,
        message: 'Selamat akun berhasil di verifikasi',
      };

      if (token) {
        Object.assign(message, { token, message: 'Silahkan ganti password' });
      }

      return message;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string): Promise<TMessageLogin> {
    let token: string;
    try {
      const user = await this.findUserByEmail(email);

      if (!user) {
        throw new NotFoundException('Akun tidak ditemukan');
      }

      const IsPAsswordCorrect = await this.checkPassword(
        password,
        user.password,
      );

      if (!IsPAsswordCorrect) {
        throw new UnauthorizedException('Password salah');
      }

      if (user.status !== 'active') {
        throw new ForbiddenException('Tolong verifikasi akun terlebih dahulu');
      }

      token = await this.tokenService.findTokenByUser({ user });

      if (!token) {
        const payload = {
          id: user.user_id,
          email: email,
          role: user.role,
        };

        const { accessToken, refreshToken } =
          await this.tokenService.generateAccessTokenAndRefreshToken(payload);

        await this.tokenService.saveToken({ accessToken, refreshToken, user });
        token = accessToken;
      }

      return {
        httpStatus: HttpStatus.OK,
        message: 'Berhasil masuk',
        role: user.role,
        email,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async refreshOtpOnRequest(
    email: string,
    type_otp: string,
  ): Promise<IMessage & { email?: string }> {
    const now = new Date().getTime() + 60_000;
    try {
      const user = await this.findUserByEmail(email);
      if (
        !user ||
        (user && user.status === 'active' && type_otp === 'register')
      ) {
        throw new NotFoundException('User tidak ditemukan');
      }

      const hasOTP = await this.doesUserHaveOTP(email);
      if (hasOTP && hasOTP.expires_at - now >= 60_000) {
        throw new BadRequestException('Tunggu 1 menit');
      }

      await this.entityManager.transaction(async (entityManager) => {
        const otp = this.otpService.generateOtp();
        if (user.status === 'active' && type_otp === 'forgot') {
          await this.transactionRefreshOtpOnRequest(
            hasOTP,
            email,
            otp,
            type_otp as TYPE_OTP,
            entityManager,
          );

          return this.emailService.sendForgotPassword(email, otp);
        }

        if (user.status !== 'active' && type_otp === 'register') {
          await this.transactionRefreshOtpOnRequest(
            hasOTP,
            email,
            otp,
            type_otp as TYPE_OTP,
            entityManager,
          );

          return this.emailService.sendVerificationEmail(email, otp);
        }

        throw new BadRequestException('Gagal kirim otp');
      });

      const message = {
        message: 'Otp berhasil dikirim',
        httpStatus: HttpStatus.OK,
      };

      if (type_otp === 'forgot') {
        Object.assign(message, { email });
      }

      return message;
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(accessToken: string): Promise<TMessageWithToken> {
    try {
      await this.validateAccessTokenExpiration(accessToken);
      const existingToken = await this.tokenService.findToken(accessToken);
      if (!existingToken) {
        throw new UnauthorizedException('token illegal');
      }

      const token = await this.tokenService.refreshToken(existingToken);
      return {
        httpStatus: HttpStatus.OK,
        message: 'RefreshToken berhasil',
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(
    token: string,
    email: string,
    new_password: string,
  ): Promise<IMessage> {
    try {
      const user = await this.userService.existsByEmail(email);

      if (!user) {
        throw new NotFoundException('User tidak ditemukan');
      }

      const payload = await this.tokenService.verifyTokenForgotPassword(token);

      if (payload.email !== email) {
        throw new UnauthorizedException('Token tidak sah');
      }

      const isTokenBlacklisted =
        this.blackListTokenService.isTokenBlacklisted(token);

      if (isTokenBlacklisted) {
        throw new ForbiddenException('Token sudah diblacklist');
      }

      const password = await this.hashingPassword(new_password);
      await this.userService.updateUser(email, { password });
      this.blackListTokenService.addTokenToBlacklist(token);

      return {
        httpStatus: HttpStatus.OK,
        message: 'Reset password berhasil',
      };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(
    email: string,
    old_password: string,
    new_password: string,
  ): Promise<IMessage> {
    try {
      const user = await this.findUserByEmail(email);
      const IsPasswordCorrect = await this.checkPassword(
        old_password,
        user.password,
      );

      if (!IsPasswordCorrect) {
        throw new BadRequestException('Password tidak sesuai');
      }

      const password = await this.hashingPassword(new_password);
      await this.userService.updateUser(email, { password });

      return {
        message: 'Password berhasil diubah',
        httpStatus: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }

  async me(token: string): Promise<TMessageWithIPayloadToken> {
    try {
      const { id, email, role } = await this.tokenService.verifyToken(token);
      return {
        id,
        email,
        role,
        message: 'Berhasil masuk',
        httpStatus: HttpStatus.OK,
      };
    } catch (error) {
      if (error.message === 'jwt expired') {
        throw new UnauthorizedException('Token sudah kadaluarsa');
      }

      throw error;
    }
  }

  private async transactionRegister(
    email: string,
    hashPassword: string,
  ): Promise<void> {
    try {
      return this.entityManager.transaction(async (entityManager) => {
        const generatedOtp = this.otpService.generateOtp();
        const createOtp = this.otpService.createTransactionOtp(
          email,
          generatedOtp,
          TYPE_OTP.REGISTER,
        );
        const createUser = this.userService.createTransactionUser(
          email,
          hashPassword,
        );

        await Promise.all([
          this.otpService.saveTransactionOtp(createOtp, entityManager),
          this.userService.saveTransactionUser(createUser, entityManager),
        ]);

        await this.emailService.sendVerificationEmail(email, createOtp.otp);
      });
    } catch (error) {
      throw error;
    }
  }

  private async hashingPassword(password: string): Promise<string> {
    return await this.hashingService.encrypt(password);
  }

  private async validateOtp(
    email: string,
    otp: string,
    type_otp: TYPE_OTP,
  ): Promise<boolean> {
    return await this.otpService.checkOtp(email, type_otp, otp);
  }

  private async doesUserHaveOTP(email: string): Promise<Otp> {
    return await this.otpService.findOtpByEmail(email);
  }

  private async consumeOtpAndTransaction(
    email: string,
    entityManager: EntityManager,
  ): Promise<void> {
    await this.otpService.consumeOtp(email, entityManager);
  }

  private async verifyUserAndTransaction(
    user: User,
    entityManager: EntityManager,
  ): Promise<void> {
    await this.userService.verificationUser(user, entityManager);
  }

  private async checkPassword(
    password: string,
    hashPassord: string,
  ): Promise<boolean> {
    return await this.hashingService.decrypt(password, hashPassord);
  }

  private async findUserByEmail(email: string) {
    return await this.userService.findOneByEmail(email);
  }

  private async transactionRefreshOtpOnRequest(
    hasOTP: Otp,
    email: string,
    otp: string,
    type_otp: TYPE_OTP,
    entityManager: EntityManager,
  ) {
    try {
      if (!hasOTP) {
        const createOtp = this.otpService.createTransactionOtp(
          email,
          otp,
          type_otp,
        );

        await this.otpService.saveTransactionOtp(createOtp, entityManager);
      } else {
        await this.otpService.updateOtpOnRequest(
          email,
          otp,
          type_otp,
          entityManager,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  private async validateAccessTokenExpiration(accessToken: string) {
    const isExpired = await this.tokenService.checkExpiredAccessToken(
      accessToken,
    );

    if (!isExpired) {
      throw new ForbiddenException('Token belum kadaluarsa');
    }
  }
}
