import { RegisterDto } from './register-user.dto';
export declare class LoginDto extends RegisterDto {
}
export declare class MeDto {
    token: string;
    constructor(partial: Partial<MeDto>);
}
