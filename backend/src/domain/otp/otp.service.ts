import { Injectable } from '@nestjs/common';
import { OtpRepository } from './otp.repository';
import { IOtpService, TYPE_OTP } from './otp.interface';
import { EntityManager, UpdateResult } from 'typeorm';
import { Otp } from './otp.entity';
import { OtpGenerator } from 'src/infrastucture/authentication/otp-management/otp.service';

@Injectable()
export class OtpService implements IOtpService {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly entityManager: EntityManager,
    private readonly otpGenerator: OtpGenerator,
  ) {}

  generateOtp(): string {
    return this.otpGenerator.createOtp(5);
  }

  createTransactionOtp(email: string, otp: string, type_otp: TYPE_OTP): Otp {
    const expires_at = new Date().getTime() + 180_000;
    return this.entityManager.create(Otp, {
      email,
      otp,
      type_otp,
      expires_at,
    });
  }

  async checkOtp(
    email: string,
    type_otp: TYPE_OTP,
    otp?: string,
  ): Promise<boolean> {
    const valid = await this.otpRepository.exists(email, type_otp, otp);
    return valid;
  }

  async findOtpByEmail(email: string): Promise<Otp> {
    return await this.otpRepository.findOtpByEmail(email);
  }

  async saveTransactionOtp(
    otp: Otp,
    entityManager: EntityManager = this.entityManager,
  ): Promise<Otp> {
    return await entityManager.save(otp);
  }

  async consumeOtp(
    email: string,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    const now = new Date().getTime();
    const payload = {
      updated_at: now,
      expires_at: now,
      used: true,
    };
    const data = await this.updateTransactionOtp(email, payload, entityManager);
    return data;
  }

  async updateOtpOnRequest(
    email: string,
    otp: string,
    type_otp: TYPE_OTP,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    const now = new Date().getTime();
    const updated_at = now;
    const expires_at = now + 180_000;
    const payload = {
      updated_at,
      expires_at,
      otp,
      type_otp,
      used: false,
    };

    const data = await this.updateTransactionOtp(email, payload, entityManager);
    return data;
  }

  private async updateTransactionOtp(
    email: string,
    payload: Partial<
      Pick<Otp, 'otp' | 'used' | 'type_otp' | 'expires_at' | 'updated_at'>
    >,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    return await entityManager.update(Otp, { email }, payload);
  }
}
