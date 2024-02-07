import { RegisterDto } from './dtos/register-user.dto';
import { AuthService } from './auth.service';
import { LoginDto, MeDto } from './dtos/login-user.dto';
import { IAuthController } from './auth.interface';
import { VerificationUserDto } from './dtos/verification-user.dto';
import { IMessage } from '../message.interface';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
export declare class AuthController implements IAuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register_user({ email, password }: RegisterDto): Promise<import("./auth.interface").TMessageWithEmail>;
    login({ email, password }: LoginDto): Promise<import("./auth.interface").TMessageLogin>;
    get_otp(email: string, type_otp: string): Promise<IMessage & {
        email?: string;
    }>;
    verifikasi_user({ email, otp, type_otp }: VerificationUserDto): Promise<IMessage & {
        email: string;
    } & {
        token?: string;
    }>;
    me({ token }: MeDto): Promise<import("./auth.interface").TMessageWithIPayloadToken>;
    reset_password_user({ email, new_password, token }: ResetPasswordDto): Promise<IMessage>;
    refresh_token({ accessToken }: RefreshTokenDto): Promise<import("./auth.interface").TMessageWithToken>;
}
