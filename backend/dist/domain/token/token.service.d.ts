import { IPayloadToken, IPayloadTokenForgotPassword, TPayloadVerifyToken } from 'src/infrastucture/authentication/token-management/token.interface';
import { JWTService } from 'src/infrastucture/authentication/token-management/token.service';
import { IGetToken, IPayloadSaveToken, ITokenService } from './token.interface';
import { TokenRepository } from './token.repository';
import { ConfigService } from '@nestjs/config';
import { Token } from './token.entity';
export declare class TokenService implements ITokenService {
    private readonly jwtService;
    private readonly tokenRepository;
    private readonly configService;
    constructor(jwtService: JWTService, tokenRepository: TokenRepository, configService: ConfigService);
    private updateToken;
    generateAccessTokenAndRefreshToken(payload: IPayloadToken): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateTokenForgotPassword(payload: IPayloadTokenForgotPassword): Promise<string>;
    saveToken(payload: IPayloadSaveToken): Promise<Token>;
    findTokenByUser(payload: IGetToken): Promise<string>;
    verifyToken(accessToken: string): Promise<TPayloadVerifyToken>;
    checkExpiredAccessToken(accessToken: string): Promise<boolean>;
    findToken(accessToken: string): Promise<Token>;
    refreshToken(token: Token): Promise<string>;
    verifyTokenForgotPassword(token: string): Promise<IPayloadTokenForgotPassword>;
}
