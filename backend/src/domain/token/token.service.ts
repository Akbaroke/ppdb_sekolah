import { BadRequestException, Injectable } from '@nestjs/common';
import {
  IPayloadToken,
  IPayloadTokenForgotPassword,
  TPayloadVerifyToken,
} from 'src/infrastucture/authentication/token-management/token.interface';
import { JWTService } from 'src/infrastucture/authentication/token-management/token.service';
import { IGetToken, IPayloadSaveToken, ITokenService } from './token.interface';
import { TokenRepository } from './token.repository';
import { ConfigService } from '@nestjs/config';
import { Token } from './token.entity';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly tokenRepository: TokenRepository,
    private readonly configService: ConfigService,
  ) {}

  private async updateToken(
    accessToken: string,
    payload?: { accessToken?: string; refreshToken?: string },
  ) {
    try {
      return await this.tokenRepository.updateToken(accessToken, payload || {});
    } catch (error) {
      throw error;
    }
  }

  async generateAccessTokenAndRefreshToken(
    payload: IPayloadToken,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.generateAccessToken(payload),
        this.jwtService.generateRefreshToken(payload, {
          secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
          expiresIn: '7d',
        }),
      ]);

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async generateTokenForgotPassword(
    payload: IPayloadTokenForgotPassword,
  ): Promise<string> {
    try {
      const token = await this.jwtService.generateTokenForgotPassword(payload, {
        secret: this.configService.getOrThrow('JWT_FORGOT_PASSWORD_KEY'),
        expiresIn: '5m',
      });
      return token;
    } catch (error) {
      throw error;
    }
  }

  async saveToken(payload: IPayloadSaveToken): Promise<Token> {
    try {
      return await this.tokenRepository.saveToken(payload);
    } catch (error) {
      throw error;
    }
  }

  async findTokenByUser(payload: IGetToken): Promise<string> {
    try {
      const data = await this.tokenRepository.findToken(payload);
      if (!data) {
        return null;
      }
      return data.accessToken;
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(accessToken: string): Promise<TPayloadVerifyToken> {
    try {
      const data = await this.jwtService.verifyAccessToken(accessToken);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async checkExpiredAccessToken(accessToken: string): Promise<boolean> {
    try {
      const isExpired = await this.jwtService
        .verifyAccessToken(accessToken)
        .then(() => false)
        .catch((error) => {
          if (error.message === 'jwt expired') {
            return true;
          }

          throw new BadRequestException('Token tidak sah');
        });

      return isExpired;
    } catch (error) {
      throw error;
    }
  }

  async findToken(accessToken: string): Promise<Token> {
    try {
      const token = await this.tokenRepository.findTokenByAccessToken(
        accessToken,
      );

      return token;
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(token: Token): Promise<string> {
    try {
      const accessToken = await this.jwtService
        .verifyRefreshToken(token.refreshToken, {
          secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
        })
        .then(async ({ id, email, role }) => {
          const createAccessToken = await this.jwtService.generateAccessToken({
            id,
            email,
            role,
          });

          await this.updateToken(token.accessToken, {
            accessToken: createAccessToken,
          });
          return createAccessToken;
        })
        .catch(async (error) => {
          if (error.message === 'jwt expired') {
            const payload = {
              id: token.user.user_id,
              email: token.user.email,
              role: token.user.role,
            };

            const generateToken = await this.generateAccessTokenAndRefreshToken(
              payload,
            );

            await this.updateToken(token.accessToken, {
              accessToken: generateToken.accessToken,
              refreshToken: generateToken.refreshToken,
            });

            return generateToken.accessToken;
          }

          throw new BadRequestException('token tidak sah');
        });

      return accessToken;
    } catch (error) {
      throw error;
    }
  }

  async verifyTokenForgotPassword(
    token: string,
  ): Promise<IPayloadTokenForgotPassword> {
    try {
      const payload = await this.jwtService.verifyTokenForgotPassword(token, {
        secret: this.configService.getOrThrow('JWT_FORGOT_PASSWORD_KEY'),
      });

      return payload;
    } catch (error) {
      throw error;
    }
  }
}
