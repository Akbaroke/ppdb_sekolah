import { TYPE_OTP } from './otp.interface';
interface IOtp {
    otp_id: string;
    email: string;
    otp: string;
    type_otp: TYPE_OTP;
    used: boolean;
    created_at: number;
    updated_at: number;
    expires_at: number;
}
export declare class Otp implements IOtp {
    otp_id: string;
    email: string;
    otp: string;
    type_otp: TYPE_OTP;
    used: boolean;
    created_at: number;
    expires_at: number;
    updated_at: number;
}
export {};
