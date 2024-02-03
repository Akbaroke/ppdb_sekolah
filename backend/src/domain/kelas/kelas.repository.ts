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

  async findAll(
    limit: number,
    skip: number,
    latest: boolean,
  ): Promise<{ data: Kelas[]; count: number }> {
    const [data, count] = await this.kelasRepository.findAndCount({
      relations: ['tahun_ajaran'],
      select: {
        tahun_ajaran: {
          tahun_ajaran: true,
        },
      },
      skip,
      take: limit,
      order: {
        created_at: latest ? 'DESC' : 'ASC',
      },
    });

    return { data, count };
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
