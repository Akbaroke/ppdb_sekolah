import { Injectable } from '@nestjs/common';
import { TahunAjaranRepository } from './tahun-ajaran.repository';
import { EntityManager } from 'typeorm';
import { TahunAjaran } from './tahun-ajaran.entity';
import {
  ICreateTahunAjaran,
  ITahunAjaranService,
} from './tahun-ajaran.interface';

@Injectable()
export class TahunAjaranService implements ITahunAjaranService {
  constructor(
    private readonly tahunAjaranRepository: TahunAjaranRepository,
    private readonly entityManager: EntityManager,
  ) {}

  private createTransactionTahunAjaran(data: ICreateTahunAjaran): TahunAjaran {
    return this.entityManager.create(TahunAjaran, {
      ...data,
    });
  }

  private async saveTransactionTahunAjaran(
    tahunAjaran: TahunAjaran,
    entityManager: EntityManager = this.entityManager,
  ): Promise<TahunAjaran> {
    return await entityManager.save(tahunAjaran);
  }

  private async findTahunAjaranById(id: string): Promise<TahunAjaran> {
    const data = await this.tahunAjaranRepository.find(id);

    return data;
  }

  async IsTahunAjaranExist(tahun_ajaran: string): Promise<boolean> {
    const isTahunAjaranExist = await this.tahunAjaranRepository.exists(
      tahun_ajaran,
    );

    return isTahunAjaranExist;
  }

  async createTahunAjaran(data: ICreateTahunAjaran): Promise<void> {
    try {
      await this.entityManager.transaction(async (entityManager) => {
        const tahunAjaran = this.createTransactionTahunAjaran(data);
        await this.saveTransactionTahunAjaran(tahunAjaran, entityManager);
      });
    } catch (error) {
      throw error;
    }
  }

  async updateTahunAjaran(
    {
      tahun_ajaran,
      besar_spp,
      biaya_daftar,
    }: Omit<ICreateTahunAjaran, 'tahun_ajaran'> & {
      tahun_ajaran: TahunAjaran;
    },
    entityManager: EntityManager = this.entityManager,
  ) {
    try {
      await entityManager.update(TahunAjaran, tahun_ajaran, {
        besar_spp,
        biaya_daftar,
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllTahunAjaran(
    limit: number,
    page: number,
    latest: boolean,
  ): Promise<{
    limit_item: number;
    start: number;
    data: TahunAjaran[];
    count: number;
  }> {
    const limit_item = limit > 20 ? 20 : limit;
    const start = (page - 1) * limit_item;

    const { data, count } = await this.tahunAjaranRepository.findAll(
      limit_item,
      start,
      latest,
    );

    return { limit_item, start, data, count };
  }

  async getTahunAjaranById(id: string): Promise<TahunAjaran> {
    return await this.findTahunAjaranById(id);
  }

  async findTahunAjaran(tahun_ajaran: string) {
    const data = await this.tahunAjaranRepository.findByTahunAjaran(
      tahun_ajaran,
    );
    return data;
  }
}
