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
import { Kelas } from 'src/domain/kelas/kelas.entity';

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
      const data = await this.dataSiswaService.getOneBySiswaId(siswa_id, raw);
      if (!data) {
        throw new NotFoundException('Siswa tidak ditemukan');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  private async getKelasWithLocking(
    jenjang: JENJANG,
    tahun_ajaran_id: string,
    entityManager: EntityManager,
  ): Promise<Kelas> {
    try {
      const kelas = await this.kelasService.getKelasAndLock(
        jenjang,
        tahun_ajaran_id,
        entityManager,
      );

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

  private async processData(
    dataArray: DataSiswa[],
    entityManager: EntityManager = this.entityManager,
  ) {
    try {
      return await entityManager.transaction(async (entityManager) => {
        return await Promise.all(
          dataArray.map(async (data, index) => {
            let kelas = await this.getKelasWithLocking(
              data.jenjang,
              data.tahun_ajaran.tahun_ajaran_id,
              entityManager,
            );

            if (!kelas) {
              return null;
            }

            if (kelas.jumlah_siswa + (index + 1) > kelas.kapasitas) {
              kelas = await this.getKelasWithLocking(
                data.jenjang,
                data.tahun_ajaran.tahun_ajaran_id,
                entityManager,
              );

              if (!kelas) {
                return null;
              }
            }

            await this.kelasService.addJumlahSiswa(kelas, entityManager);

            const nis = this.createNis(
              data.no_pendaftaran,
              data.tahun_ajaran.tahun_ajaran,
              data.jenjang,
            );

            return {
              ...data,
              kelas,
              nis,
              status: STATUS_SISWA.SISWA,
            };
          }),
        );
      });
    } catch (error) {
      throw error;
    }
  }

  async acc(siswa_id: string[]): Promise<IMessage> {
    try {
      const filter_data = {
        tka: [],
        tkb: [],
        pg: [],
      };

      const data_siswa = await this.dataSiswaService.getAllDataSiswaBySiswaId(
        siswa_id,
      );

      data_siswa.forEach((data) => {
        switch (data.jenjang) {
          case JENJANG.TKA:
            filter_data.tka.push(data);
            break;
          case JENJANG.TKB:
            filter_data.tkb.push(data);
            break;
          case JENJANG.PG:
            filter_data.pg.push(data);
            break;
          default:
            break;
        }
      });

      await this.entityManager.transaction(async (entityManager) => {
        const data = await Promise.all([
          this.processData(filter_data.pg, entityManager),
          this.processData(filter_data.tka, entityManager),
          this.processData(filter_data.tkb, entityManager),
        ]);

        const flattenedData = data.flat().filter((v) => v !== null);

        if (flattenedData.length > 0) {
          await Promise.all(
            flattenedData.map(async (payload) => {
              await this.dataSiswaService.updateTransactionDataSiswa(
                payload.data_siswa_id,
                payload,
                entityManager,
              );
            }),
          );
        }
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
    const now = new Date().getTime();
    try {
      const data_siswa = await this.getDataSiswaBySiswaId(siswa_id, true);
      this.validateSiswaStatus(data_siswa.status, STATUS_SISWA.KELUAR);

      await this.dataSiswaService.updateTransactionDataSiswa(
        data_siswa.data_siswa_id,
        {
          status: STATUS_SISWA.KELUAR,
          keterangan,
          tanggal_berakhir: now,
        },
      );

      return {
        httpStatus: HttpStatus.OK,
        message: 'Berhasil',
      };
    } catch (error) {
      throw error;
    }
  }

  async lulus(siswa_id: string, file: Express.Multer.File): Promise<IMessage> {
    const now = new Date().getTime();
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
          {
            status: STATUS_SISWA.LULUS,
            ijazah: data,
            keterangan: 'lulus',
            tanggal_berakhir: now,
          },
          entityManager,
        );
      });

      return {
        httpStatus: HttpStatus.ACCEPTED,
        message: 'Berhasil',
      };
    } catch (error) {
      if (ijazah && ijazah.file_firebase_id !== undefined) {
        await this.fileService.deleteFile(
          data_siswa.siswa.user_id,
          ijazah.file_firebase_id,
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
    search = undefined,
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
          search,
        );

      const pagination = this.paginationService.createPagination(
        count,
        limit_item,
        page,
        start,
      );

      const data_siswa = data.map((value) => {
        return {
          id: value.siswa.siswa_id,
          status: value.status,
          imgUrl: value.foto.url,
          nama: value.siswa.nama,
          jenis_kelamin: value.siswa.jenis_kelamin,
          tahun_ajaran: value.tahun_ajaran.tahun_ajaran,
          no_pendaftaran: value.no_pendaftaran,
          jenjang: value.jenjang,
          ...(value.status !== STATUS_SISWA.PENDAFTAR && {
            nis: value.nis,
            kelas: value.kelas.kode_kelas,
          }),
        };
      });

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
