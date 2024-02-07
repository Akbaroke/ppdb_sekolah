import { Repository } from 'typeorm';
import { Otp } from './otp.entity';
import { IOtpRepository, TYPE_OTP } from './otp.interface';
export declare class OtpRepository implements IOtpRepository {
    private readonly otpRepository;
    constructor(otpRepository: Repository<Otp>);
    exists(email: string, type_otp: TYPE_OTP, otp?: string): Promise<boolean>;
    findOtpByEmail(email: string): Promise<Otp>;
}
