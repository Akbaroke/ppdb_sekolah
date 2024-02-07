import { JwtSignOptions } from '@nestjs/jwt';
export interface IJWTService {
    generateAccessToken(payload: IPayloadToken): Promise<string>;
    generateRefreshToken(payload: IPayloadToken, options?: JwtSignOptions): Promise<string>;
    generateTokenForgotPassword(payload: IPayloadTokenForgotPassword, options?: JwtSignOptions): Promise<string>;
    verifyAccessToken(accessToken: string): Promise<TPayloadVerifyToken>;
    verifyRefreshToken(refreshToken: string, options?: JwtSignOptions): Promise<TPayloadVerifyToken>;
    verifyTokenForgotPassword(token: string, options?: JwtSignOptions): Promise<IPayloadTokenForgotPassword>;
}
interface IPayloadResponse {
    iat: number;
    exp: number;
}
export interface IPayloadToken {
    id: string;
    role: string;
    email: string;
}
export interface IPayloadTokenForgotPassword {
    id: string;
    email: string;
}
export type TPayloadVerifyToken = IPayloadToken & IPayloadResponse;
export {};
