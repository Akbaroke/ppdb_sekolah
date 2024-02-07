import { Injectable } from '@nestjs/common';
import { TahunAjaran } from './tahun-ajaran.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ITahunAjaranRepository } from './tahun-ajaran.interface';

@Injectable()
export class TahunAjaranRepository implements ITahunAjaranRepository {
  constructor(
    @InjectRepository(TahunAjaran)
    private readonly tahunAjaranRepository: Repository<TahunAjaran>,
  ) {}

  async exists(tahun_ajaran: string): Promise<boolean> {
    return await this.tahunAjaranRepository.exists({ where: { tahun_ajaran } });
  }

  async findAll(
    limit: number,
    skip: number,
    latest: boolean,
  ): Promise<{ data: TahunAjaran[]; count: number }> {
    const order = latest ? 'desc' : 'asc';

    const [data, count] = await this.tahunAjaranRepository.findAndCount({
      skip,
      take: limit,
      order: {
        created_at: order,
      },
    });

    return { data, count };
  }

  async findAllBysearch(
    limit: number,
    skip: number,
    latest: boolean,
    search: string,
  ): Promise<{ data: TahunAjaran[]; count: number }> {
    const order = latest ? 'desc' : 'asc';

    const [data, count] = await this.tahunAjaranRepository.findAndCount({
      where: [
        {
          tahun_ajaran: Like(`%${search}%`),
        },
        {
          besar_spp: Number(search) || 0,
        },
        {
          biaya_daftar: Number(search) || 0,
        },
      ],
      skip,
      take: limit,
      order: {
        created_at: order,
      },
    });

    return { data, count };
  }

  async find(tahun_ajaran_id: string): Promise<TahunAjaran> {
    return await this.tahunAjaranRepository.findOne({
      where: { tahun_ajaran_id },
    });
  }

  async findByTahunAjaran(tahun_ajaran: string): Promise<TahunAjaran> {
    return await this.tahunAjaranRepository.findOne({
      where: {
        tahun_ajaran,
      },
    });
  }
}
