import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JENJANG } from 'src/domain/kelas/kelas.interface';
import { KelasService } from 'src/domain/kelas/kelas.service';
import { TahunAjaranService } from 'src/domain/tahun-ajaran/tahun-ajaran.service';
import { IMessage } from '../message.interface';
import { Kelas } from 'src/domain/kelas/kelas.entity';
import { TahunAjaran } from 'src/domain/tahun-ajaran/tahun-ajaran.entity';

@Injectable()
export class UsecaseKelasService {
  constructor(
    private kelasService: KelasService,
    private tahunAjaranService: TahunAjaranService,
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

  async getAllKelas(): Promise<IMessage & { data?: Kelas[] }> {
    try {
      const data = await this.kelasService.getAllKelas();

      if (!data) {
        return {
          httpStatus: HttpStatus.FOUND,
          message: 'Kelas belum ada',
        };
      }

      return {
        httpStatus: HttpStatus.OK,
        message: 'Data kelas berhasil diambil',
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  async getKelas(kelas_id: string): Promise<IMessage & { data: Kelas }> {
    try {
      const data = await this.kelasService.getKelasById(kelas_id);

      if (!data) {
        throw new NotFoundException('Kelas tidak ditemukan');
      }

      return {
        message: 'Data kelas berhasil diambil',
        httpStatus: HttpStatus.OK,
        data,
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
