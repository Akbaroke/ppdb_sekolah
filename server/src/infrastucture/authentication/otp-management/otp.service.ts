import { Injectable } from '@nestjs/common';
import { generate } from 'otp-generator';
import { IOtpManagement } from './otp.interface';

@Injectable()
export class OtpGenerator implements IOtpManagement {
  createOtp(length: number): string {
    const otp = generate(length, {
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
      digits: true,
    });

    return otp;
  }
}
