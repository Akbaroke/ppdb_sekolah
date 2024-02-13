import { Injectable } from '@nestjs/common';
import { EntityManager, FindManyOptions, In, UpdateResult } from 'typeorm';
import { DataSiswa } from './data_siswa.entity';
import { ICreateDataSiswa, STATUS_SISWA } from './data_siswa.interface';
import { DataSiswaRepository } from './data_siswa.repository';

@Injectable()
export class DataSiswaService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly dataSiswaRepository: DataSiswaRepository,
  ) {}

  private async findOneBySiswaId(siswa_id: string, raw: boolean) {
    try {
      const relations = raw
        ? []
        : ['wali_siswa', 'siswa', 'akta', 'kartu_keluarga', 'foto'];

      return await this.dataSiswaRepository.findOne({
        where: {
          siswa: {
            siswa_id,
          },
        },
        relations,
      });
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

      const options = {
        where: {
          status: In(status),
        },
        relations: ['siswa', 'foto'],
        skip: start,
        take: limit,
        order: {
          updated_at: order,
        },
        select: {
          data_siswa_id: true,
          siswa: {
            siswa_id: true,
            nama: true,
            jenis_kelamin: true,
          },
          foto: {
            url: true,
          },
          tahun_ajaran: {
            tahun_ajaran: true,
          },
          no_pendaftaran: true,
          jenjang: true,
          updated_at: true,
        },
      } as FindManyOptions<DataSiswa>;

      const { data, count } = await this.dataSiswaRepository.findAllAndCount(
        options,
      );

      return { limit_item, start, data, count };
    } catch (error) {
      throw error;
    }
  }

  async getAllDataSiswaByUserId(user_id: string): Promise<DataSiswa[]> {
    try {
      return await this.dataSiswaRepository.findAll({
        where: {
          siswa: {
            user: {
              user_id,
            },
          },
        },
        relations: {
          siswa: true,
          foto: true,
        },
        select: {
          data_siswa_id: true,
          siswa: {
            siswa_id: true,
            nama: true,
          },
          foto: {
            url: true,
          },
          nis: true,
          keterangan: true,
          status: true,
          no_pendaftaran: true,
          jenjang: true,
          created_at: true,
        },
      });
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
        return await this.findOneBySiswaId(siswa_id, raw);
      } else {
        return await this.findOneBySiswaId(siswa_id, raw);
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
