import { Injectable } from '@nestjs/common';
import { TahunAjaran } from './tahun-ajaran.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TahunAjaranRepository {
  constructor(
    @InjectRepository(TahunAjaran)
    private readonly tahunAjaranRepository: Repository<TahunAjaran>,
  ) {}

  async exists(tahun_ajaran: string): Promise<boolean> {
    try {
      return await this.tahunAjaranRepository.exists({
        where: { tahun_ajaran },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    limit: number,
    skip: number,
    latest: boolean,
  ): Promise<{ data: TahunAjaran[]; count: number }> {
    try {
      const order = latest ? 'desc' : 'asc';

      const [data, count] = await this.tahunAjaranRepository.findAndCount({
        skip,
        take: limit,
        order: {
          updated_at: order,
        },
      });

      return { data, count };
    } catch (error) {
      throw error;
    }
  }

  async findAllBysearch(
    limit: number,
    skip: number,
    latest: boolean,
    search: string,
  ): Promise<{ data: TahunAjaran[]; count: number }> {
    try {
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
          updated_at: order,
        },
        cache: true,
      });

      return { data, count };
    } catch (error) {
      throw error;
    }
  }

  async find(tahun_ajaran_id: string): Promise<TahunAjaran> {
    try {
      return await this.tahunAjaranRepository.findOne({
        where: { tahun_ajaran_id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findByTahunAjaran(tahun_ajaran: string): Promise<TahunAjaran> {
    try {
      return await this.tahunAjaranRepository.findOne({
        where: {
          tahun_ajaran,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
