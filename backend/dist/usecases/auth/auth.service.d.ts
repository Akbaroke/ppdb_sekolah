import { UserService } from 'src/domain/user/user.service';
import { IAuthService, TMessageWithEmail, TMessageWithToken, TMessageWithIPayloadToken, TMessageLogin } from './auth.interface';
import { HashingService } from 'src/infrastucture/hashing/hashing.service';
import { EntityManager } from 'typeorm';
import { NodemailerService } from 'src/infrastucture/email/nodemailer.service';
import { OtpService } from 'src/domain/otp/otp.service';
import { TokenService } from 'src/domain/token/token.service';
import { TYPE_OTP } from 'src/domain/otp/otp.interface';
import { IMessage } from '../message.interface';
import { BlacklistService } from './blacklist.service';
export declare class AuthService implements IAuthService {
    private readonly entityManager;
    private readonly userService;
    private readonly emailService;
    private readonly hashingService;
    private readonly otpService;
    private readonly tokenService;
    private readonly blackListTokenService;
    constructor(entityManager: EntityManager, userService: UserService, emailService: NodemailerService, hashingService: HashingService, otpService: OtpService, tokenService: TokenService, blackListTokenService: BlacklistService);
    register(email: string, password: string): Promise<TMessageWithEmail>;
    verificationOTP(email: string, otp: string, type_otp: TYPE_OTP): Promise<TMessageWithEmail & {
        token?: string;
    }>;
    login(email: string, password: string): Promise<TMessageLogin>;
    refreshOtpOnRequest(email: string, type_otp: string): Promise<IMessage & {
        email?: string;
    }>;
    refreshToken(accessToken: string): Promise<TMessageWithToken>;
    resetPassword(token: string, email: string, new_password: string): Promise<IMessage>;
    me(token: string): Promise<TMessageWithIPayloadToken>;
    private transactionRegister;
    private hashingPassword;
    private validateOtp;
    private doesUserHaveOTP;
    private consumeOtpAndTransaction;
    private verifyUserAndTransaction;
    private checkPassword;
    private findUserByEmail;
    private transactionRefreshOtpOnRequest;
    private validateAccessTokenExpiration;
}
