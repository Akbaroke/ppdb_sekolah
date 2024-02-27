import { Injectable } from '@nestjs/common';
import { WaliSiswaRepository } from './wali-siswa.repository';
import { EntityManager, UpdateResult } from 'typeorm';
import { WaliSiswa } from './wali-siswa.entity';
import { ICreateWaliSiswa, IPayloadWaliSiswa } from './wali-siswa.interface';

@Injectable()
export class WaliSiswaService {
  constructor(
    private readonly waliSiswaRepository: WaliSiswaRepository,
    private readonly entityManager: EntityManager,
  ) {}

  createTransactionWali(data: ICreateWaliSiswa): WaliSiswa {
    try {
      return this.entityManager.create(WaliSiswa, { ...data });
    } catch (error) {
      throw error;
    }
  }

  async saveTransactionWali(
    waliSiswa: WaliSiswa,
    entityManager: EntityManager = this.entityManager,
  ): Promise<WaliSiswa> {
    try {
      return await entityManager.save(waliSiswa);
    } catch (error) {
      throw error;
    }
  }

  async findWaliSiswa(payload: IPayloadWaliSiswa) {
    try {
      return await this.waliSiswaRepository.findOne(payload);
    } catch (error) {
      throw error;
    }
  }

  async updatetransactionSiswa(
    wali_siswa_id: string,
    wali_siswa: Partial<WaliSiswa>,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    try {
      return await entityManager.update(
        WaliSiswa,
        { wali_siswa_id },
        wali_siswa,
      );
    } catch (error) {
      throw error;
    }
  }
}
