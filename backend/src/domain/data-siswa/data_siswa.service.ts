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

  private async findAllDataSiswaWithoutSearch(
    status: STATUS_SISWA[],
    start: number,
    limit_item: number,
    order: string,
  ) {
    try {
      const { data, count } = await this.dataSiswaRepository.findAll(
        status,
        start,
        limit_item,
        order,
      );

      return { limit_item, start, data, count };
    } catch (error) {
      throw error;
    }
  }

  private async findAllDataSiswaWithSearch(
    status: STATUS_SISWA[],
    start: number,
    limit_item: number,
    order: string,
    search: string,
  ) {
    try {
      const { data, count } = await this.dataSiswaRepository.findAllAndSearch(
        status,
        start,
        limit_item,
        order,
        search,
      );

      return { limit_item, start, data, count };
    } catch (error) {
      throw error;
    }
  }

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
    search: string,
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

      if (search) {
        return await this.findAllDataSiswaWithSearch(
          status,
          start,
          limit_item,
          order,
          search,
        );
      } else {
        return this.findAllDataSiswaWithoutSearch(
          status,
          start,
          limit_item,
          order,
        );
      }
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

  async getOneBySiswaId(siswa_id: string, raw: boolean): Promise<DataSiswa> {
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
