import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import {
  IJWTService,
  IPayloadToken,
  IPayloadTokenForgotPassword,
  TPayloadVerifyToken,
} from './token.interface';

@Injectable()
export class JWTService implements IJWTService {
  constructor(private readonly jwtService: JwtService) {}

  private async generateToken(
    payload: IPayloadToken | IPayloadTokenForgotPassword,
    options?: JwtSignOptions,
  ) {
    const token = await this.jwtService.signAsync(payload, options || {});
    return token;
  }

  private async verifyToken(
    token: string,
    options?: JwtSignOptions,
  ): Promise<any> {
    return await this.jwtService
      .verifyAsync(token, options || {})
      .catch((error) => {
        if (error.message === 'invalid signature') {
          throw new UnauthorizedException('Token tidak sah');
        }

        throw error;
      });
  }

  async generateTokenForgotPassword(
    payload: IPayloadTokenForgotPassword,
    options?: JwtSignOptions,
  ): Promise<string> {
    return await this.generateToken(payload, options || {});
  }

  async generateAccessToken(payload: IPayloadToken): Promise<string> {
    return await this.generateToken(payload);
  }

  async generateRefreshToken(
    payload: IPayloadToken,
    options?: JwtSignOptions,
  ): Promise<string> {
    return await this.generateToken(payload, options || {});
  }

  async verifyAccessToken(accessToken: string): Promise<TPayloadVerifyToken> {
    return await this.verifyToken(accessToken);
  }

  async verifyRefreshToken(
    refreshToken: string,
    options?: JwtSignOptions,
  ): Promise<TPayloadVerifyToken> {
    return await this.verifyToken(refreshToken, options || {});
  }

  async verifyTokenForgotPassword(
    token: string,
    options?: JwtSignOptions,
  ): Promise<IPayloadTokenForgotPassword> {
    const payload = await this.verifyToken(token, options || {});
    return payload;
  }
}
