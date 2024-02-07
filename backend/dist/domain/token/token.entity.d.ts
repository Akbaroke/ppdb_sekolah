import { User } from '../user/user.entity';
interface IToken {
    token_id: string;
    accessToken?: string;
    refreshToken?: string;
    user: User;
}
export declare class Token implements IToken {
    token_id: string;
    accessToken?: string;
    refreshToken?: string;
    user: User;
    constructor(data: Partial<Token>);
}
export {};
