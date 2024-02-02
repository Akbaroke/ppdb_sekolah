import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TahunAjaranRepository } from './tahun-ajaran.repository';
import { EntityManager } from 'typeorm';
import { TahunAjaran } from './tahun-ajaran.entity';
import {
  ICreateTahunAjaran,
  ITahunAjaranService,
} from './tahun-ajaran.interface';
import { IMessage } from 'src/usecases/message.interface';

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

  async createTahunAjaran(data: ICreateTahunAjaran): Promise<IMessage> {
    try {
      const isTahunAjaranExist = await this.tahunAjaranRepository.exists(
        data.tahun_ajaran,
      );

      if (isTahunAjaranExist) {
        throw new ConflictException('Tahun ajaran sudah ada');
      }

      await this.entityManager.transaction(async (entityManager) => {
        const tahunAjaran = this.createTransactionTahunAjaran(data);
        await this.saveTransactionTahunAjaran(tahunAjaran, entityManager);
      });

      return {
        httpStatus: HttpStatus.CREATED,
        message: 'Berhasil membuat tahun ajaran',
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllTahunAjaran(): Promise<IMessage & { data?: TahunAjaran[] }> {
    try {
      const data = await this.tahunAjaranRepository.findAll();

      if (data.length === 0) {
        return {
          message: 'belum ada tahun ajaran',
          httpStatus: HttpStatus.NO_CONTENT,
        };
      }

      return {
        data,
        message: 'Tahun ajaran berhasil diambil',
        httpStatus: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }

  async getTahunAjaranById(
    id: string,
  ): Promise<IMessage & { data: TahunAjaran }> {
    try {
      const data = await this.findTahunAjaranById(id);

      if (!data) {
        throw new NotFoundException('Tahun ajaran tidak ditemukan');
      }

      return {
        data,
        message: 'Tahun ajaran berhasil diambil',
        httpStatus: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }

  async findTahunAjaran(tahun_ajaran: string) {
    const data = await this.tahunAjaranRepository.findByTahunAjaran(
      tahun_ajaran,
    );
    return data;
  }
}
