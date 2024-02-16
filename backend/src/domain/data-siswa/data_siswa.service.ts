import { Injectable } from '@nestjs/common';
import { EntityManager, UpdateResult } from 'typeorm';
import { DataSiswa } from './data_siswa.entity';
import { ICreateDataSiswa, STATUS_SISWA } from './data_siswa.interface';
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

  async getAllDataSiswa(
    status_siswa: STATUS_SISWA | undefined,
    limit: number,
    page: number,
    latest: boolean,
  ) {
    try {
      const limit_item = limit > 20 ? 20 : limit;
      const start = (page - 1) * limit_item;
      const order = latest ? 'desc' : 'asc';

      const status =
        status_siswa === undefined
          ? [
              STATUS_SISWA.PENDAFTAR,
              STATUS_SISWA.SISWA,
              STATUS_SISWA.LULUS,
              STATUS_SISWA.KELUAR,
            ]
          : [status_siswa];

      const { data, count } = await this.dataSiswaRepository.findAllAndCount(
        status,
        start,
        limit_item,
        order,
      );

      return { data, count, limit_item, start };
    } catch (error) {
      throw error;
    }
  }

  async getAllDataSiswaByUserId(user_id: string): Promise<DataSiswa[]> {
    try {
      return await this.dataSiswaRepository.findAllByUserId(user_id);
    } catch (error) {
      throw error;
    }
  }

  async getOneByDataSiswaId(
    siswa_id: string,
    raw: boolean,
  ): Promise<DataSiswa> {
    try {
      return await this.dataSiswaRepository.findOneBySiswaId(siswa_id, raw);
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
