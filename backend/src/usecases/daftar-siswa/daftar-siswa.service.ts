import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SiswaService } from 'src/domain/siswa/siswa.service';
import { WaliSiswaService } from 'src/domain/wali-siswa/wali-siswa.service';
import { EntityManager } from 'typeorm';
import { IDataSiswa, ITransformedDataSiswa } from './daftar-siswa.interface';
import { UserService } from 'src/domain/user/user.service';
import { FileService } from 'src/domain/file/file.service';
import { DataSiswaService } from 'src/domain/data-siswa/data_siswa.service';
import { Siswa } from 'src/domain/siswa/siswa.entity';
import { WaliSiswa } from 'src/domain/wali-siswa/wali-siswa.entity';
import { File } from 'src/domain/file/file.entity';
import { DataSiswa } from 'src/domain/data-siswa/data_siswa.entity';
import { IMessage } from '../message.interface';
import { TahunAjaranService } from 'src/domain/tahun-ajaran/tahun-ajaran.service';
import {
  ICreateDataSiswa,
  STATUS_SISWA,
} from 'src/domain/data-siswa/data_siswa.interface';
import { IPayloadToken } from 'src/infrastucture/authentication/token-management/token.interface';
import { User } from 'src/domain/user/user.entity';
import { TahunAjaran } from 'src/domain/tahun-ajaran/tahun-ajaran.entity';

@Injectable()
export class DaftarSiswaService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly siswaService: SiswaService,
    private readonly waliSiswaService: WaliSiswaService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly dataSiswaService: DataSiswaService,
    private readonly tahunAjaranService: TahunAjaranService,
  ) {}

  private async createSiswa(
    { siswa }: Required<Pick<IDataSiswa, 'siswa'>>,
    entityManager: EntityManager = this.entityManager,
  ): Promise<Siswa> {
    try {
      const findSiswa = await this.siswaService.findSiswaByNama({
        user_id: siswa.user_id,
        nama: siswa.nama,
      });

      if (findSiswa) {
        throw new ConflictException('Siswa sudah ada');
      }

      const createSiswa = this.siswaService.createTransactionSiswa({
        ...siswa,
        user_id: siswa.user_id,
      });

      return await this.siswaService.saveTransactionSiswa(
        createSiswa,
        entityManager,
      );
    } catch (error) {
      throw error;
    }
  }

  private async createWaliSiswa(
    { wali_siswa }: Pick<IDataSiswa, 'wali_siswa'>,
    entityManager: EntityManager = this.entityManager,
  ): Promise<WaliSiswa> {
    try {
      const createWali = this.waliSiswaService.createTransactionWali({
        ...wali_siswa,
      });

      return await this.waliSiswaService.saveTransactionWali(
        createWali,
        entityManager,
      );
    } catch (error) {
      throw error;
    }
  }

  private async createBerkas(
    user_id: string,
    akta: Express.Multer.File,
    kartu_keluarga: Express.Multer.File,
    foto: Express.Multer.File,
    entityManager: EntityManager = this.entityManager,
  ): Promise<File[]> {
    try {
      const create_berkas_siswa = await this.fileService.createBerkas(user_id, {
        akta,
        kartu_keluarga,
        foto,
      });

      return await this.fileService.saveFiles(
        create_berkas_siswa,
        entityManager,
      );
    } catch (error) {
      throw error;
    }
  }

  private async createDataSiswa(
    data: ICreateDataSiswa,
    entityManager: EntityManager = this.entityManager,
  ): Promise<DataSiswa> {
    try {
      const createDataSiswa =
        this.dataSiswaService.createTransactionDataSiswa(data);

      return await this.dataSiswaService.saveTransactionKelas(
        createDataSiswa,
        entityManager,
      );
    } catch (error) {
      throw error;
    }
  }

  private async findDataSiswaBySiswaId(
    siswa_id: string,
    raw = true,
  ): Promise<DataSiswa> {
    try {
      const data = await this.dataSiswaService.getOneBySiswaId(siswa_id, raw);

      if (!data) {
        throw new NotFoundException('Data siswa tidak ditemukan');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  private async findUserByUserId(user_id: string): Promise<User> {
    try {
      const data = await this.userService.findOne(user_id);

      if (!data) {
        throw new NotFoundException('User tidak ditemukan');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  private async findTahunAjaranBytahun_ajaran(
    tahun_ajaran: string,
  ): Promise<TahunAjaran> {
    try {
      const data = await this.tahunAjaranService.findTahunAjaran(tahun_ajaran);

      if (!data) {
        throw new NotFoundException('Tahun ajaran tidak ditemukan');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  private checkPermissionForDataAccess(
    data_siswa: DataSiswa,
    user_id: string,
    role: string,
  ): void {
    if (data_siswa.siswa.user_id !== user_id && role !== 'admin') {
      throw new ForbiddenException(
        'Anda tidak memiliki izin untuk mengakses data siswa',
      );
    }
  }

  async daftarSiswa(
    user_id: string,
    data: IDataSiswa,
    berkas: {
      akta: Express.Multer.File;
      kartu_keluarga: Express.Multer.File;
      foto: Express.Multer.File;
    },
  ): Promise<IMessage & { id: string }> {
    let berkas_siswa: File[] = [];
    let siswa_id: string;
    try {
      const user = await this.findUserByUserId(user_id);

      if (Number(data.tahun_ajaran.split('/')[0]) < new Date().getFullYear()) {
        throw new BadRequestException(
          'Tahun ajaran tidak sesuai, sekarang tahun ajaran 2024/2025',
        );
      }

      const tahun_ajaran = await this.findTahunAjaranBytahun_ajaran(
        data.tahun_ajaran,
      );

      if (data.status !== STATUS_SISWA.PENDAFTAR) {
        throw new BadRequestException('status harus pendaftar');
      }

      await this.entityManager.transaction(async (entityManager) => {
        Object.assign(data.siswa, { user });
        const siswa = await this.createSiswa(data, entityManager);
        const wali_siswa = await this.createWaliSiswa(data, entityManager);
        berkas_siswa = await this.createBerkas(
          user_id,
          berkas.akta[0],
          berkas.kartu_keluarga[0],
          berkas.foto[0],
          entityManager,
        );

        const payload = {
          siswa,
          wali_siswa,
          akta: berkas_siswa[0],
          kartu_keluarga: berkas_siswa[1],
          foto: berkas_siswa[2],
          jenjang: data.jenjang,
          tahun_ajaran,
          status: data.status,
        };

        await this.createDataSiswa(payload, entityManager);
        siswa_id = siswa.siswa_id;
      });

      return {
        id: siswa_id,
        httpStatus: HttpStatus.OK,
        message: 'Pendaftaran berhasil silahkan selesaikan pembayaran.',
      };
    } catch (error) {
      if (berkas_siswa.length) {
        berkas_siswa.forEach(async (value) => {
          if (value) {
            await this.fileService.deleteFile(user_id, value.file_firebase_id);
          }
        });
      }
      throw error;
    }
  }

  async getAllDaftarSiswa(
    user_id: string,
  ): Promise<IMessage & { data: ITransformedDataSiswa[] }> {
    try {
      const data = await this.dataSiswaService.getAllDataSiswaByUserId(user_id);
      const transformedData = data.map((item) => {
        const commonData = {
          id: item.siswa.siswa_id,
          imgUrl: item.foto.url,
          nama: item.siswa.nama,
          jenis_kelamin: item.siswa.jenis_kelamin,
          status: item.status,
          tahun_ajaran: item.tahun_ajaran.tahun_ajaran,
          jenjang: item.jenjang,
          created_at: item.created_at,
        };

        if (item.status === STATUS_SISWA.PENDAFTAR) {
          return {
            ...commonData,
            no_pendaftaran: item.no_pendaftaran,
          };
        }

        return {
          ...commonData,
          nis: item.nis,
          kelas: item.kelas?.kode_kelas ?? null,
          no_pendaftaran: item.no_pendaftaran,
        };
      });
      return {
        httpStatus: HttpStatus.OK,
        message: 'sukses',
        data: transformedData,
      };
    } catch (error) {
      throw error;
    }
  }

  async getDataSiswa(
    siswa_id: string,
    user_id: string,
    role: string,
  ): Promise<IMessage & { data: object }> {
    try {
      const data_siswa = await this.findDataSiswaBySiswaId(siswa_id, false);
      this.checkPermissionForDataAccess(data_siswa, user_id, role);

      const responseData = {
        id: data_siswa.siswa.siswa_id,
        status: data_siswa.status,
        siswa: {
          nama: data_siswa.siswa.nama,
          tempat_lahir: data_siswa.siswa.tempat_lahir,
          tanggal_lahir: data_siswa.siswa.tanggal_lahir,
          umur: data_siswa.siswa.umur,
          jenis_kelamin: data_siswa.siswa.jenis_kelamin,
          agama: data_siswa.siswa.agama,
          tinggi_badan: data_siswa.siswa.tinggi_badan,
          berat_badan: data_siswa.siswa.berat_badan,
        },
        wali: {
          nama_ibu: data_siswa.wali_siswa.nama_ibu,
          nama_bapak: data_siswa.wali_siswa.nama_bapak,
          nama_wali: data_siswa.wali_siswa.nama_wali,
          pekerjaan: data_siswa.wali_siswa.pekerjaan,
          no_telepon: data_siswa.wali_siswa.no_telepon,
          alamat: data_siswa.wali_siswa.alamat,
        },
        berkas: {
          akta: data_siswa.akta.url,
          kartu_keluarga: data_siswa.kartu_keluarga.url,
          foto: data_siswa.foto.url,
        },
        jenjang: data_siswa.jenjang,
        tahun_ajaran: data_siswa.tahun_ajaran.tahun_ajaran,
      };

      if (data_siswa.status === STATUS_SISWA.LULUS) {
        responseData['tanggal_lulus'] = data_siswa.tanggal_berakhir;
        responseData['berkas']['ijazah'] = data_siswa.ijazah?.url;
        responseData['keterangan'] = data_siswa.keterangan;
      }

      if (data_siswa.status === STATUS_SISWA.KELUAR) {
        responseData['tanggal_keluar'] = data_siswa.tanggal_berakhir;
        responseData['keterangan'] = data_siswa.keterangan;
      }

      return {
        message: 'Data berhasil diambil',
        httpStatus: HttpStatus.OK,
        data: responseData,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateDaftarSiswa(
    siswa_id: string,
    payload: Partial<IPayloadToken>,
    updatedData: Partial<IDataSiswa>,
    berkas: {
      akta?: Express.Multer.File;
      kartu_keluarga?: Express.Multer.File;
      foto?: Express.Multer.File;
    },
  ): Promise<IMessage> {
    try {
      const data_siswa = await this.findDataSiswaBySiswaId(siswa_id, false);
      this.checkPermissionForDataAccess(data_siswa, payload.id, payload.role);

      if (
        (payload.role !== 'admin' &&
          !data_siswa.nis &&
          updatedData.status !== STATUS_SISWA.PENDAFTAR) ||
        (data_siswa.nis && updatedData.status !== STATUS_SISWA.SISWA)
      ) {
        throw new BadRequestException('user tidak bisa mengubah status');
      }

      const update_tahun_ajaran = Number(
        updatedData.tahun_ajaran.split('/')[0],
      );
      const tahun_ajaran = Number(
        data_siswa.tahun_ajaran.tahun_ajaran.split('/')[0],
      );

      if (
        data_siswa.status !== STATUS_SISWA.PENDAFTAR &&
        update_tahun_ajaran !== tahun_ajaran
      ) {
        throw new BadRequestException(
          'Tahun ajaran tidak sesuai dengan tahun ajaran siswa',
        );
      }

      if (
        payload.role !== 'admin' &&
        data_siswa.status === STATUS_SISWA.PENDAFTAR &&
        update_tahun_ajaran < tahun_ajaran
      ) {
        throw new BadRequestException('Anda tidak memiliki akses');
      }

      if (
        updatedData.status !== STATUS_SISWA.PENDAFTAR &&
        payload.role !== 'admin' &&
        updatedData.jenjang !== data_siswa.kelas.jenjang
      ) {
        throw new BadRequestException(
          `jenjang tidak bisa diubah dikarenakan jenjang kelas ${data_siswa.kelas.jenjang}`,
        );
      }

      if (berkas.akta) {
        await this.fileService.updateBerkas(
          data_siswa.siswa.user_id,
          data_siswa.akta.file_firebase_id,
          berkas.akta[0],
        );
      }

      if (berkas.foto) {
        await this.fileService.updateBerkas(
          data_siswa.siswa.user_id,
          data_siswa.foto.file_firebase_id,
          berkas.foto[0],
        );
      }

      if (berkas.kartu_keluarga) {
        await this.fileService.updateBerkas(
          data_siswa.siswa.user_id,
          data_siswa.kartu_keluarga.file_firebase_id,
          berkas.kartu_keluarga[0],
        );
      }

      await this.entityManager.transaction(async (entityManager) => {
        if (updatedData.wali_siswa) {
          await this.waliSiswaService.updatetransactionSiswa(
            data_siswa.wali_siswa.wali_siswa_id,
            updatedData.wali_siswa,
            entityManager,
          );
        }

        if (updatedData.siswa) {
          await this.siswaService.updatetransactionSiswa(
            data_siswa.siswa.siswa_id,
            updatedData.siswa,
            entityManager,
          );
        }

        if (updatedData.tahun_ajaran) {
          if (
            data_siswa.tahun_ajaran.tahun_ajaran !== updatedData.tahun_ajaran
          ) {
            const tahun_ajaran = await this.tahunAjaranService.findTahunAjaran(
              updatedData.tahun_ajaran,
            );
            data_siswa.tahun_ajaran = tahun_ajaran;
          }
        }

        data_siswa.status = updatedData.status;
        data_siswa.jenjang = updatedData.jenjang;
        await this.dataSiswaService.updateTransactionDataSiswa(
          data_siswa.data_siswa_id,
          data_siswa,
          entityManager,
        );
      });

      return {
        httpStatus: HttpStatus.OK,
        message: 'Berhasil di update',
      };
    } catch (error) {
      throw error;
    }
  }
}
