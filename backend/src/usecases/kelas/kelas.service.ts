import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JENJANG } from 'src/domain/kelas/kelas.interface';
import { KelasService } from 'src/domain/kelas/kelas.service';
import { TahunAjaranService } from 'src/domain/tahun-ajaran/tahun-ajaran.service';
import { IMessage } from '../message.interface';
import { TahunAjaran } from 'src/domain/tahun-ajaran/tahun-ajaran.entity';
import { IResponseDataKelas, IUsecaseKelasService } from './kelas.interface';
import { Kelas } from 'src/domain/kelas/kelas.entity';
import { PaginationService } from '../services/pagination.service';

@Injectable()
export class UsecaseKelasService implements IUsecaseKelasService {
  constructor(
    private kelasService: KelasService,
    private tahunAjaranService: TahunAjaranService,
    private paginationService: PaginationService,
  ) {}

  private async getTahunAjaran(tahun_ajaran: string): Promise<TahunAjaran> {
    try {
      const data = await this.tahunAjaranService.findTahunAjaran(tahun_ajaran);

      if (!data) {
        throw new NotFoundException('Tahun ajaran tidak ada');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  private mapResponseData(kelas: Kelas[]): IResponseDataKelas[] {
    try {
      const data = kelas.map((value) => ({
        id: value.kelas_id,
        jenjang: value.jenjang,
        jumlah_siswa: value.jumlah_siswa,
        kelas: value.kelas,
        tahun_ajaran: value.tahun_ajaran?.tahun_ajaran,
        kode_kelas: value.kode_kelas,
        created_at: value.created_at,
        updated_at: value.updated_at,
      }));

      return data;
    } catch (error) {
      throw error;
    }
  }

  async createKelas(jenjang: JENJANG, tahun_ajaran: string): Promise<IMessage> {
    try {
      const findTahunAjaran = await this.getTahunAjaran(tahun_ajaran);

      await this.kelasService.createKelas({
        jenjang,
        tahun_ajaran: findTahunAjaran,
      });

      return {
        httpStatus: HttpStatus.OK,
        message: 'Kelas berhasil dibuat',
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllKelas(
    limit = 10,
    page = 1,
    latest = true,
  ): Promise<IMessage & { data?: IResponseDataKelas[]; pagination?: object }> {
    try {
      if (page < 1 || limit < 1) {
        throw new BadRequestException('page minimal 1 dan limit minimal 1');
      }

      const { data, count, limit_item, start } =
        await this.kelasService.getAllKelas(limit, page, latest);

      const res = this.mapResponseData(data);
      const pagination = this.paginationService.createPagination(
        count,
        limit_item,
        page,
        start,
      );

      return {
        httpStatus: HttpStatus.OK,
        message: 'Data kelas berhasil diambil',
        data: res,
        pagination,
      };
    } catch (error) {
      throw error;
    }
  }

  async getKelas(
    kelas_id: string,
  ): Promise<IMessage & { data: IResponseDataKelas }> {
    try {
      const getData = await this.kelasService.getKelasById(kelas_id);

      if (!getData) {
        throw new NotFoundException('Kelas tidak ditemukan');
      }

      const data = this.mapResponseData([getData]);

      return {
        message: 'Data kelas berhasil diambil',
        httpStatus: HttpStatus.OK,
        data: data[0],
      };
    } catch (error) {
      throw error;
    }
  }

  async updateKelas(
    kelas_id: string,
    jenjang: JENJANG,
    tahun_ajaran: string,
  ): Promise<IMessage> {
    try {
      const findTahunAjaran = await this.getTahunAjaran(tahun_ajaran);
      await this.kelasService.updateKelas(kelas_id, jenjang, findTahunAjaran);
      return {
        httpStatus: HttpStatus.OK,
        message: 'Kelas berhasil diupdate',
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteKelas(kelas_id: string): Promise<IMessage> {
    try {
      await this.kelasService.deleteKelas(kelas_id);

      return {
        httpStatus: HttpStatus.OK,
        message: 'Kelas berhasil di hapus',
      };
    } catch (error) {
      throw error;
    }
  }
}
