import { IOtpManagement } from './otp.interface';
export declare class OtpGenerator implements IOtpManagement {
    createOtp(length: number): string;
}
