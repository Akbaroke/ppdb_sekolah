import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICreateTahunAjaran } from 'src/domain/tahun-ajaran/tahun-ajaran.interface';
import { TahunAjaranService } from 'src/domain/tahun-ajaran/tahun-ajaran.service';
import { IMessage } from '../message.interface';
import { TahunAjaran } from 'src/domain/tahun-ajaran/tahun-ajaran.entity';
import { PaginationService } from '../services/pagination.service';

@Injectable()
export class UsecaseTahunAjaranService {
  constructor(
    private readonly tahunAjaranService: TahunAjaranService,
    private readonly paginationService: PaginationService,
  ) {}

  private async checkTahunAjaran(id: string): Promise<TahunAjaran> {
    try {
      const data = await this.tahunAjaranService.getTahunAjaranById(id);

      if (!data) {
        throw new NotFoundException('Tahun ajaran tidak ditemukan');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async createTahunAjaran(data: ICreateTahunAjaran): Promise<IMessage> {
    try {
      const checkTahunAjaran = await this.tahunAjaranService.IsTahunAjaranExist(
        data.tahun_ajaran,
      );

      if (checkTahunAjaran) {
        throw new ConflictException('Tahun ajaran sudah ada');
      }

      await this.tahunAjaranService.createTahunAjaran(data);

      return {
        httpStatus: HttpStatus.CREATED,
        message: 'Berhasil membuat tahun ajaran',
      };
    } catch (error) {
      throw error;
    }
  }

  async getTahunAjaran(id: string): Promise<IMessage & { data: TahunAjaran }> {
    try {
      const data = await this.checkTahunAjaran(id);

      return {
        data,
        message: 'Tahun ajaran berhasil diambil',
        httpStatus: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateTahunAjaran(
    id: string,
    payload: Omit<ICreateTahunAjaran, 'tahun_ajaran'>,
  ): Promise<IMessage> {
    try {
      const tahun_ajaran = await this.checkTahunAjaran(id);
      await this.tahunAjaranService.updateTahunAjaran({
        ...payload,
        tahun_ajaran,
      });

      return {
        message: 'Berhasil merubah tahun ajaran.',
        httpStatus: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllTahunAjaran(
    limit = 10,
    page = 1,
    latest = true,
    search: string = undefined,
  ): Promise<IMessage & { data?: TahunAjaran[]; pagination?: object }> {
    try {
      if (page < 1 || limit < 1) {
        throw new BadRequestException('page minimal 1 dan limit minimal 1');
      }

      const { data, count, limit_item, start } =
        await this.tahunAjaranService.getAllTahunAjaran(
          limit,
          page,
          latest,
          search,
        );

      const pagination = this.paginationService.createPagination(
        count,
        limit_item,
        page,
        start,
      );

      return {
        httpStatus: HttpStatus.OK,
        message: 'Data kelas berhasil diambil',
        data,
        pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}
