import { Injectable } from '@nestjs/common';
import { SiswaRepository } from './siswa.repository';
import { EntityManager, UpdateResult } from 'typeorm';
import { Siswa } from './siswa.entity';
import { ICreateSiswa, IFindSiswa } from './siswa.interface';

@Injectable()
export class SiswaService {
  constructor(
    private readonly siswaRepository: SiswaRepository,
    private readonly entityManager: EntityManager,
  ) {}

  createTransactionSiswa(data: Required<ICreateSiswa>): Siswa {
    try {
      return this.entityManager.create(Siswa, {
        ...data,
      });
    } catch (error) {
      throw error;
    }
  }

  async saveTransactionSiswa(
    siswa: Siswa,
    entityManager: EntityManager = this.entityManager,
  ): Promise<Siswa> {
    try {
      return await entityManager.save(siswa);
    } catch (error) {
      throw error;
    }
  }

  async findSiswaByNama(payload: Required<IFindSiswa>): Promise<Siswa> {
    try {
      const data = await this.siswaRepository.find(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updatetransactionSiswa(
    siswa_id: string,
    siswa: Partial<Siswa>,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    try {
      return await entityManager.update(Siswa, { siswa_id }, siswa);
    } catch (error) {
      throw error;
    }
  }
}
