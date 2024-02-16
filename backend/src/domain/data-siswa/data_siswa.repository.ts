import { Injectable } from '@nestjs/common';
import { FindManyOptions, In, Repository } from 'typeorm';
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

  async findAllByUserId(user_id: string) {
    try {
      return await this.dataSiswaRepository.find({
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

  async findAllAndCount(
    status: STATUS_SISWA[],
    start: number,
    limit: number,
    order: string,
  ) {
    try {
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
