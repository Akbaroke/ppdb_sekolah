import { TYPE_OTP } from 'src/domain/otp/otp.interface';
export declare class VerificationUserDto {
    email: string;
    otp: string;
    type_otp: TYPE_OTP;
    constructor(partial: Partial<VerificationUserDto>);
}
