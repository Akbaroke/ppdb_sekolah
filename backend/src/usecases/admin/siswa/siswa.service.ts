import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { STATUS_SISWA } from 'src/domain/data-siswa/data_siswa.interface';
import { DataSiswaService } from 'src/domain/data-siswa/data_siswa.service';
import { FileService } from 'src/domain/file/file.service';
import { JENJANG } from 'src/domain/kelas/kelas.interface';
import { KelasService } from 'src/domain/kelas/kelas.service';
import { IMessage } from 'src/usecases/message.interface';
import { EntityManager } from 'typeorm';
import { File } from 'src/domain/file/file.entity';
import { DataSiswa } from 'src/domain/data-siswa/data_siswa.entity';
import { PaginationService } from 'src/usecases/services/pagination.service';

@Injectable()
export class SiswaService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly dataSiswaService: DataSiswaService,
    private readonly kelasService: KelasService,
    private readonly fileService: FileService,
    protected readonly paginationService: PaginationService,
  ) {}

  private async getDataSiswaBySiswaId(siswa_id: string, raw = true) {
    try {
      const data = await this.dataSiswaService.getOneByDataSiswaId(
        siswa_id,
        raw,
      );
      if (!data) {
        throw new NotFoundException('Siswa tidak ditemukan');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  private async getKelasWithLocking(
    kelas_id: string,
    entityManager: EntityManager,
  ) {
    try {
      const kelas = await this.kelasService.getKelasAndLock(
        kelas_id,
        entityManager,
      );
      if (!kelas) {
        throw new NotFoundException('Kelas tidak ditemukan');
      }

      return kelas;
    } catch (error) {
      throw error;
    }
  }

  private createNis(
    no_pendaftaran: string,
    tahun_ajaran: string,
    jenjang: JENJANG,
  ) {
    let nis: string;
    try {
      const tahun_siswa = Number(`20${no_pendaftaran.slice(0, 2)}`);
      const tahun_kelas = Number(tahun_ajaran.split('/')[0]);

      if (tahun_kelas < tahun_siswa) {
        throw new BadRequestException(
          'Tahun ajaran kelas tidak sesuai dengan tahun ajaran siswa',
        );
      }

      switch (jenjang) {
        case JENJANG.PG:
          nis = '101';
          break;
        case JENJANG.TKA:
          nis = '201';
          break;
        case JENJANG.TKB:
          nis = '301';
          break;
        default:
          throw new BadRequestException('Jenjang kelas tidak valid');
      }

      nis += `${no_pendaftaran.slice(-4)}${String(tahun_siswa).slice(-2)}`;
      return nis;
    } catch (error) {
      throw error;
    }
  }

  private validateSiswaStatus(
    status_siswa: STATUS_SISWA,
    status: STATUS_SISWA,
  ) {
    if (status_siswa === status) {
      throw new BadRequestException(`Siswa sudah ${status}`);
    }

    if (status_siswa !== STATUS_SISWA.SISWA) {
      throw new BadRequestException(
        `Siswa tidak bisa ${status}, jika status bukan "siswa"`,
      );
    }
  }

  async acc(siswa_id: string, kelas_id: string): Promise<IMessage> {
    try {
      await this.entityManager.transaction(async (entityManager) => {
        const kelas = await this.getKelasWithLocking(kelas_id, entityManager);
        const data_siswa = await this.getDataSiswaBySiswaId(siswa_id, true);

        if (data_siswa.status !== STATUS_SISWA.PENDAFTAR) {
          throw new BadRequestException('Siswa sudah di acc');
        }

        if (data_siswa.jenjang !== kelas.jenjang) {
          throw new BadRequestException(
            'Kelas tidak sesuai dengan jenjang siswa',
          );
        }

        const nis = this.createNis(
          data_siswa.no_pendaftaran,
          kelas.tahun_ajaran.tahun_ajaran,
          kelas.jenjang,
        );

        await this.kelasService.updateJumlahSiswaKelas(kelas, entityManager);
        await this.dataSiswaService.updateTransactionDataSiswa(
          data_siswa.data_siswa_id,
          {
            status: STATUS_SISWA.SISWA,
            kelas,
            nis,
          },
          entityManager,
        );
      });

      return {
        httpStatus: HttpStatus.OK,
        message: 'Berhasil',
      };
    } catch (error) {
      throw error;
    }
  }

  async keluar(siswa_id: string, keterangan: string): Promise<IMessage> {
    try {
      const data_siswa = await this.getDataSiswaBySiswaId(siswa_id, true);
      this.validateSiswaStatus(data_siswa.status, STATUS_SISWA.KELUAR);

      await this.dataSiswaService.updateTransactionDataSiswa(
        data_siswa.data_siswa_id,
        {
          status: STATUS_SISWA.KELUAR,
          keterangan,
        },
      );

      return {
        httpStatus: HttpStatus.ACCEPTED,
        message: 'Berhasil',
      };
    } catch (error) {
      throw error;
    }
  }

  async lulus(siswa_id: string, file: Express.Multer.File): Promise<IMessage> {
    let data_siswa: DataSiswa;
    let ijazah: File;
    try {
      await this.entityManager.transaction(async (entityManager) => {
        data_siswa = await this.getDataSiswaBySiswaId(siswa_id, false);
        this.validateSiswaStatus(data_siswa.status, STATUS_SISWA.LULUS);
        ijazah = await this.fileService.createIjazah(
          data_siswa.siswa.user_id,
          file,
        );

        const data = await this.fileService.saveFile(ijazah, entityManager);

        await this.dataSiswaService.updateTransactionDataSiswa(
          data_siswa.data_siswa_id,
          { status: STATUS_SISWA.LULUS, ijazah: data, keterangan: 'lulus' },
          entityManager,
        );
      });

      return {
        httpStatus: HttpStatus.ACCEPTED,
        message: 'Berhasil',
      };
    } catch (error) {
      if (ijazah && ijazah.file_id !== undefined) {
        await this.fileService.deleteFile(
          data_siswa.siswa.user_id,
          ijazah.file_id,
        );
      }
      throw error;
    }
  }

  async getAllDataSiswa(
    status: STATUS_SISWA | undefined,
    limit = 10,
    page = 1,
    latest = true,
  ): Promise<IMessage & { data: object; pagination: object }> {
    try {
      if (page < 1 || limit < 1) {
        throw new BadRequestException('page minimal 1 dan limit minimal 1');
      }

      const { data, count, limit_item, start } =
        await this.dataSiswaService.getAllDataSiswa(
          status,
          limit,
          page,
          latest,
        );

      const pagination = this.paginationService.createPagination(
        count,
        limit_item,
        page,
        start,
      );

      const data_siswa = data.map((value) => ({
        id: value.siswa.siswa_id,
        status: value.status,
        imgUrl: value.foto.url,
        nama: value.siswa.nama,
        jenis_kelamin: value.siswa.jenis_kelamin,
        tahun_ajaran: value.tahun_ajaran.tahun_ajaran,
        no_pendaftaran: value.no_pendaftaran,
        jenjang: value.jenjang,
      }));

      return {
        httpStatus: HttpStatus.OK,
        message: 'Berhasil',
        data: data_siswa,
        pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}
