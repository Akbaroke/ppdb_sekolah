import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Otp } from './otp.entity';
import { TYPE_OTP } from './otp.interface';

@Injectable()
export class OtpRepository {
  constructor(
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
  ) {}

  async exists(
    email: string,
    type_otp: TYPE_OTP,
    otp?: string,
  ): Promise<boolean> {
    try {
      const now = new Date().getTime();
      const data = await this.otpRepository.exists({
        where: {
          email,
          otp,
          type_otp,
          expires_at: MoreThanOrEqual(now),
          used: false,
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOtpByEmail(email: string): Promise<Otp> {
    try {
      const data = await this.otpRepository.findOne({ where: { email } });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
