import { Injectable } from '@nestjs/common';
import { FindManyOptions, In, Like, Repository } from 'typeorm';
import { DataSiswa } from './data_siswa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { STATUS_SISWA } from './data_siswa.interface';

@Injectable()
export class DataSiswaRepository {
  constructor(
    @InjectRepository(DataSiswa)
    private readonly dataSiswaRepository: Repository<DataSiswa>,
  ) {}

  async findOneBySiswaId(siswa_id: string, raw = true) {
    try {
      const relations = raw
        ? []
        : ['wali_siswa', 'siswa', 'akta', 'kartu_keluarga', 'foto', 'ijazah'];

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

  async findAllBySiswaId(siswa_id: string[], status: STATUS_SISWA) {
    try {
      return await this.dataSiswaRepository.find({
        where: {
          siswa: {
            siswa_id: In(siswa_id),
          },
          status,
        },
        relations: ['siswa'],
        order: {
          siswa: {
            nama: 'ASC',
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAllByUserId(user_id: string) {
    try {
      const options = {
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
      } as FindManyOptions<DataSiswa>;

      return await this.dataSiswaRepository.find(options);
    } catch (error) {
      throw error;
    }
  }

  async findAllAndSearch(
    status: STATUS_SISWA[],
    start: number,
    limit: number,
    order: string,
    search: string,
  ) {
    try {
      const options = {
        where: [
          {
            siswa: {
              nama: Like(`%${search}%`),
            },
            status: In(status),
          },
          {
            tahun_ajaran: {
              tahun_ajaran: Like(`%${search}%`),
            },
            status: In(status),
          },
          {
            jenjang: Like(`%${search}%`),
            status: In(status),
          },
          {
            kelas: {
              kode_kelas: Like(`%${search}%`),
            },
          },
          {
            no_pendaftaran: Like(`%${search}%`),
            status: In(status),
          },
          {
            nis: Like(`%${search}%`),
            status: In(status),
          },
        ],
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
          status: true,
          no_pendaftaran: true,
          jenjang: true,
          nis: true,
          updated_at: true,
        },
        cache: true,
      } as FindManyOptions<DataSiswa>;

      const [data, count] = await this.dataSiswaRepository.findAndCount(
        options,
      );

      return { data, count };
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    status: STATUS_SISWA[],
    start: number,
    limit: number,
    order: string,
  ) {
    try {
      const options = {
        where: [
          {
            status: In(status),
          },
        ],
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
          status: true,
          no_pendaftaran: true,
          jenjang: true,
          nis: true,
          updated_at: true,
        },
      } as FindManyOptions<DataSiswa>;

      const [data, count] = await this.dataSiswaRepository.findAndCount(
        options,
      );

      return { data, count };
    } catch (error) {
      throw error;
    }
  }
}
