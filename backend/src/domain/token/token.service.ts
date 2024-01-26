import { Injectable } from '@nestjs/common';
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

  async generateAccessTokenAndRefreshToken(
    payload: IPayloadToken,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.generateAccessToken(payload),
      this.jwtService.generateRefreshToken(payload, {
        secret: this.configService.getOrThrow('jwt_secret_key'),
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async generateTokenForgotPassword(
    payload: IPayloadTokenForgotPassword,
  ): Promise<string> {
    const token = await this.jwtService.generateTokenForgotPassword(payload, {
      secret: this.configService.getOrThrow('jwt_forgot_password_key'),
      expiresIn: '5m',
    });
    return token;
  }

  async saveToken(payload: IPayloadSaveToken): Promise<Token> {
    return await this.tokenRepository.saveToken(payload);
  }

  async findTokenByUser(payload: IGetToken): Promise<string> {
    const data = await this.tokenRepository.findOne(payload);
    if (!data) {
      return null;
    }
    return data.accessToken;
  }

  async verifyToken(accessToken: string): Promise<TPayloadVerifyToken> {
    return await this.jwtService.verifyAccessToken(accessToken);
  }

  async verifyTokenForgotPassword(
    token: string,
  ): Promise<IPayloadTokenForgotPassword> {
    const payload = await this.jwtService.verifyTokenForgotPassword(token, {
      secret: this.configService.getOrThrow('jwt_forgot_password_key'),
    });

    return payload;
  }
}
