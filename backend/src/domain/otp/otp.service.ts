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
    try {
      return this.otpGenerator.createOtp(5);
    } catch (error) {
      throw error;
    }
  }

  createTransactionOtp(email: string, otp: string, type_otp: TYPE_OTP): Otp {
    try {
      const expires_at = new Date().getTime() + 180_000;
      return this.entityManager.create(Otp, {
        email,
        otp,
        type_otp,
        expires_at,
      });
    } catch (error) {
      throw error;
    }
  }

  async checkOtp(
    email: string,
    type_otp: TYPE_OTP,
    otp?: string,
  ): Promise<boolean> {
    try {
      const valid = await this.otpRepository.exists(email, type_otp, otp);
      return valid;
    } catch (error) {
      throw error;
    }
  }

  async findOtpByEmail(email: string): Promise<Otp> {
    try {
      return await this.otpRepository.findOtpByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async saveTransactionOtp(
    otp: Otp,
    entityManager: EntityManager = this.entityManager,
  ): Promise<Otp> {
    try {
      return await entityManager.save(otp);
    } catch (error) {
      throw error;
    }
  }

  async consumeOtp(
    email: string,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    try {
      const now = new Date().getTime();
      const payload = {
        updated_at: now,
        expires_at: now,
        used: true,
      };
      const data = await this.updateTransactionOtp(
        email,
        payload,
        entityManager,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateOtpOnRequest(
    email: string,
    otp: string,
    type_otp: TYPE_OTP,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    try {
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

      const data = await this.updateTransactionOtp(
        email,
        payload,
        entityManager,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  private async updateTransactionOtp(
    email: string,
    payload: Partial<
      Pick<Otp, 'otp' | 'used' | 'type_otp' | 'expires_at' | 'updated_at'>
    >,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    try {
      return await entityManager.update(Otp, { email }, payload);
    } catch (error) {
      throw error;
    }
  }
}
