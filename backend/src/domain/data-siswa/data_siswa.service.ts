import { Injectable } from '@nestjs/common';
import { EntityManager, UpdateResult } from 'typeorm';
import { DataSiswa } from './data_siswa.entity';
import { ICreateDataSiswa } from './data_siswa.interface';
import { DataSiswaRepository } from './data_siswa.repository';

@Injectable()
export class DataSiswaService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly dataSiswaRepository: DataSiswaRepository,
  ) {}

  createTransactionDataSiswa(data: ICreateDataSiswa): DataSiswa {
    try {
      return this.entityManager.create(DataSiswa, {
        ...data,
      });
    } catch (error) {
      throw error;
    }
  }

  async saveTransactionKelas(
    data_siswa: DataSiswa,
    entityManager: EntityManager = this.entityManager,
  ): Promise<DataSiswa> {
    try {
      return await entityManager.save(data_siswa);
    } catch (error) {
      throw error;
    }
  }

  async getAllDataSiswaByUserId(user_id: string): Promise<DataSiswa[]> {
    try {
      return await this.dataSiswaRepository.findByUserId(user_id);
    } catch (error) {
      throw error;
    }
  }

  async getOneByDataSiswaId(
    siswa_id: string,
    raw: boolean,
  ): Promise<DataSiswa> {
    try {
      if (raw) {
        return await this.dataSiswaRepository.findOneRaw(siswa_id);
      } else {
        return await this.dataSiswaRepository.findOne(siswa_id);
      }
    } catch (error) {
      throw error;
    }
  }

  async updateTransactionDataSiswa(
    data_siswa_id: string,
    data_siswa: Partial<DataSiswa>,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    try {
      return await entityManager.update(
        DataSiswa,
        { data_siswa_id },
        data_siswa,
      );
    } catch (error) {
      throw error;
    }
  }
}
