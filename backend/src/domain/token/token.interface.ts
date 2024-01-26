import {
  IPayloadToken,
  IPayloadTokenForgotPassword,
  TPayloadVerifyToken,
} from 'src/infrastucture/authentication/token-management/token.interface';
import { User } from '../user/user.entity';
import { Token } from './token.entity';

export interface IPayloadSaveToken {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface IGetToken {
  user: User;
}

export interface ITokenRepository {
  saveToken(payload: IPayloadSaveToken): Promise<Token>;
  findOne(payload: IGetToken): Promise<Token>;
}

export interface ITokenService {
  generateAccessTokenAndRefreshToken(
    payload: IPayloadToken,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  generateTokenForgotPassword(
    payload: IPayloadTokenForgotPassword,
  ): Promise<string>;
  saveToken(payload: IPayloadSaveToken): Promise<Token>;
  findTokenByUser(payload: IGetToken): Promise<string>;
  verifyToken(
    token: string,
    type: 'forgot' | 'accessToken',
  ): Promise<TPayloadVerifyToken>;
  verifyTokenForgotPassword(
    token: string,
  ): Promise<IPayloadTokenForgotPassword>;
}