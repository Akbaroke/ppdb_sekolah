import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { IJWTService, IPayloadToken, IPayloadTokenForgotPassword, TPayloadVerifyToken } from './token.interface';
export declare class JWTService implements IJWTService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    private generateToken;
    private verifyToken;
    generateTokenForgotPassword(payload: IPayloadTokenForgotPassword, options?: JwtSignOptions): Promise<string>;
    generateAccessToken(payload: IPayloadToken): Promise<string>;
    generateRefreshToken(payload: IPayloadToken, options?: JwtSignOptions): Promise<string>;
    verifyAccessToken(accessToken: string): Promise<TPayloadVerifyToken>;
    verifyRefreshToken(refreshToken: string, options?: JwtSignOptions): Promise<TPayloadVerifyToken>;
    verifyTokenForgotPassword(token: string, options?: JwtSignOptions): Promise<IPayloadTokenForgotPassword>;
}
