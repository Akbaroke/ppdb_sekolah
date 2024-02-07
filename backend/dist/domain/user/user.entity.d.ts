import { ROLE_USER, STATUS_USER } from './user.interface';
import { Token } from '../token/token.entity';
interface IUser {
    user_id: string;
    email: string;
    password: string;
    status: STATUS_USER;
    role: ROLE_USER;
    token: Token;
    created_at: number;
    updated_at: number;
}
export declare class User implements IUser {
    user_id: string;
    email: string;
    password: string;
    status: STATUS_USER;
    role: ROLE_USER;
    token: Token;
    created_at: number;
    updated_at: number;
}
export {};
