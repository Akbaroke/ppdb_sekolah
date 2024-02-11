import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DataSiswa } from './data_siswa.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DataSiswaRepository {
  constructor(
    @InjectRepository(DataSiswa)
    private readonly dataSiswaRepository: Repository<DataSiswa>,
  ) {}

  async findOneRaw(siswa_id: string) {
    try {
      return await this.dataSiswaRepository.findOne({
        where: {
          siswa: {
            siswa_id,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(siswa_id: string) {
    try {
      return await this.dataSiswaRepository.findOne({
        where: {
          siswa: {
            siswa_id,
          },
        },
        relations: ['wali_siswa', 'siswa', 'akta', 'kartu_keluarga', 'foto'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(user_id: string) {
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
}
