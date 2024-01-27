import { IMessage } from '../message.interface';
import { LoginDto, MeDto } from './dtos/login-user.dto';
import { RegisterDto } from './dtos/register-user.dto';
import { VerificationUserDto } from './dtos/verification-user.dto';
import { IPayloadToken } from '../../infrastucture/authentication/token-management/token.interface';
import { TYPE_OTP } from 'src/domain/otp/otp.interface';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

export type TMessageWithEmail = IMessage & { email: string };
export type TMessageWithToken = IMessage & { token: string };
export type TMessageWithIPayloadToken = IMessage & IPayloadToken;

export interface IAuthService {
  register(email: string, password: string): Promise<TMessageWithEmail>;
  login(email: string, password: string): Promise<TMessageWithToken>;
  me(token: string): Promise<TMessageWithIPayloadToken>;
  verificationOTP(
    email: string,
    otp: string,
    type_otp: TYPE_OTP,
  ): Promise<TMessageWithEmail & { token?: string }>;
  refreshOtpOnRequest(
    email: string,
    type_otp: string,
  ): Promise<IMessage & { email?: string }>;
  resetPassword(
    token: string,
    email: string,
    new_password: string,
  ): Promise<IMessage>;
}

export interface IAuthController {
  register_user(body: RegisterDto): Promise<TMessageWithEmail>;
  login(body: LoginDto): Promise<TMessageWithToken>;
  verifikasi_user(body: VerificationUserDto): Promise<TMessageWithEmail>;
  refresh_token(body: RefreshTokenDto): Promise<TMessageWithToken>;
  me(body: MeDto): Promise<TMessageWithIPayloadToken>;
  get_otp(
    email: string,
    type_otp: string,
  ): Promise<IMessage & { email?: string }>;
  reset_password_user(body: ResetPasswordDto): Promise<IMessage>;
}
