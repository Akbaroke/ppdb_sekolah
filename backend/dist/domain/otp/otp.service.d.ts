import { OtpRepository } from './otp.repository';
import { IOtpService, TYPE_OTP } from './otp.interface';
import { EntityManager, UpdateResult } from 'typeorm';
import { Otp } from './otp.entity';
import { OtpGenerator } from 'src/infrastucture/authentication/otp-management/otp.service';
export declare class OtpService implements IOtpService {
    private readonly otpRepository;
    private readonly entityManager;
    private readonly otpGenerator;
    constructor(otpRepository: OtpRepository, entityManager: EntityManager, otpGenerator: OtpGenerator);
    generateOtp(): string;
    createTransactionOtp(email: string, otp: string, type_otp: TYPE_OTP): Otp;
    checkOtp(email: string, type_otp: TYPE_OTP, otp?: string): Promise<boolean>;
    findOtpByEmail(email: string): Promise<Otp>;
    saveTransactionOtp(otp: Otp, entityManager?: EntityManager): Promise<Otp>;
    consumeOtp(email: string, entityManager?: EntityManager): Promise<UpdateResult>;
    updateOtpOnRequest(email: string, otp: string, type_otp: TYPE_OTP, entityManager?: EntityManager): Promise<UpdateResult>;
    private updateTransactionOtp;
}
