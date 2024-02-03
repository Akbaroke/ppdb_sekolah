import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Kelas } from './kelas.entity';
import { TahunAjaran } from '../tahun-ajaran/tahun-ajaran.entity';
import { IKelasRepository, JENJANG } from './kelas.interface';

@Injectable()
export class KelasRepository implements IKelasRepository {
  constructor(
    @InjectRepository(Kelas)
    private readonly kelasRepository: Repository<Kelas>,
  ) {}

  async countKelas(
    jenjang: JENJANG,
    tahun_ajaran: TahunAjaran,
  ): Promise<number> {
    const count = await this.kelasRepository.count({
      where: {
        jenjang,
        tahun_ajaran,
      },
    });

    return count;
  }

  async findAll(): Promise<Kelas[]> {
    const data = await this.kelasRepository.find({
      relations: ['tahun_ajaran'],
      select: {
        tahun_ajaran: {
          tahun_ajaran: true,
        },
      },
    });
    return data;
  }

  async find(id: string): Promise<Kelas> {
    const data = await this.kelasRepository.findOne({
      where: { kelas_id: id },
      relations: ['tahun_ajaran'],
      select: {
        tahun_ajaran: {
          tahun_ajaran: true,
        },
      },
    });

    return data;
  }
}
