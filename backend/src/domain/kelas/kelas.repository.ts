import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
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
    const order = latest ? 'desc' : 'asc';
    const [data, count] = await this.kelasRepository.findAndCount({
      relations: ['tahun_ajaran'],
      select: {
        tahun_ajaran: {
          tahun_ajaran: true,
        },
      },
      order: {
        created_at: order,
      },
      skip,
      take: limit,
    });

    return { data, count };
  }

  async findAllBySearch(
    limit: number,
    skip: number,
    latest: boolean,
    search: string,
  ): Promise<{ data: Kelas[]; count: number }> {
    const order = latest ? 'desc' : 'asc';

    const [data, count] = await this.kelasRepository.findAndCount({
      where: [
        {
          kelas: search,
        },
        {
          kode_kelas: search,
        },
        {
          jenjang: search as JENJANG,
        },
        {
          tahun_ajaran: {
            tahun_ajaran: Like(`%${search}%`),
          },
        },
      ],
      relations: ['tahun_ajaran'],
      select: {
        tahun_ajaran: {
          tahun_ajaran: true,
        },
      },
      order: {
        created_at: order,
      },
      skip,
      take: limit,
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
