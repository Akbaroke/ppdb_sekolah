import { Token } from './token.entity';
import { Repository, UpdateResult } from 'typeorm';
import { IGetToken, IPayloadSaveToken, ITokenRepository } from './token.interface';
export declare class TokenRepository implements ITokenRepository {
    private readonly tokenRepository;
    constructor(tokenRepository: Repository<Token>);
    findToken(payload: IGetToken): Promise<Token>;
    findTokenByAccessToken(accessToken: string): Promise<Token>;
    saveToken(payload: IPayloadSaveToken): Promise<Token>;
    updateToken(accessToken: string, payload?: {
        accessToken?: string;
        refreshToken?: string;
    }): Promise<UpdateResult>;
}
