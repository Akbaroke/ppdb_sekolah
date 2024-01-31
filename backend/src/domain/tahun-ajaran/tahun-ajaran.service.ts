import {
  BadRequestException,
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

  private validationTahunAjaran(tahunAjaran: string): boolean {
    const splitTahunAjaran = tahunAjaran.split('/');
    const tahunAjaran1 = Number(splitTahunAjaran[0]);
    const tahunAjaran2 = Number(splitTahunAjaran[1]);
    const currentYear = new Date().getFullYear();

    if (
      tahunAjaran1 > currentYear ||
      tahunAjaran2 > currentYear + 1 ||
      tahunAjaran1 !== tahunAjaran2 - 1
    ) {
      return false;
    }

    return true;
  }

  async createTahunAjaran(data: ICreateTahunAjaran): Promise<IMessage> {
    try {
      const isTrue = this.validationTahunAjaran(data.tahun_ajaran);

      if (!isTrue) {
        throw new BadRequestException(
          'Tolong masukkan tahun ajaran yang benar',
        );
      }

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
      const data = await this.tahunAjaranRepository.find(id);

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
}
