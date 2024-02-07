import { EntityManager } from 'typeorm';
import { Otp } from './otp.entity';
export declare enum TYPE_OTP {
    FORGOT = "forgot",
    REGISTER = "register"
}
export interface IOtpRepository {
    exists(email: string, otp: string, type_otp: TYPE_OTP): Promise<boolean>;
    findOtpByEmail(email: string): Promise<Otp>;
}
export interface IOtpService {
    generateOtp(): string;
    createTransactionOtp(email: string, otp: string, type_otp: TYPE_OTP): Otp;
    saveTransactionOtp(otp: Otp, entityManager: EntityManager): Promise<Otp>;
    checkOtp(email: string, otp: string, type_otp: TYPE_OTP): Promise<boolean>;
    findOtpByEmail(email: string): Promise<Otp>;
}
