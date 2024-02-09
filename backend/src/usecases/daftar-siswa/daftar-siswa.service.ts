import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { SiswaService } from 'src/domain/siswa/siswa.service';
import { WaliSiswaService } from 'src/domain/wali-siswa/wali-siswa.service';
import { EntityManager } from 'typeorm';
import { IDataSiswa } from './daftar-siswa.interface';
import { UserService } from 'src/domain/user/user.service';
import { FileService } from 'src/domain/file/file.service';
import { DataSiswaService } from 'src/domain/data-siswa/data_siswa.service';
import { Siswa } from 'src/domain/siswa/siswa.entity';
import { WaliSiswa } from 'src/domain/wali-siswa/wali-siswa.entity';
import { File } from 'src/domain/file/file.entity';
import { DataSiswa } from 'src/domain/data-siswa/data_siswa.entity';
import { IMessage } from '../message.interface';

@Injectable()
export class DaftarSiswaService {
  constructor(
    private readonly siswaService: SiswaService,
    private readonly waliSiswaService: WaliSiswaService,
    private readonly entityManager: EntityManager,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly dataSiswaService: DataSiswaService,
  ) {}

  private async createSiswa(
    { siswa }: Pick<IDataSiswa, 'siswa'>,
    entityManager: EntityManager = this.entityManager,
  ): Promise<Siswa> {
    try {
      const createSiswa = this.siswaService.createTransactionSiswa(siswa);

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
      const createWali =
        this.waliSiswaService.createTransactionWali(wali_siswa);

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

      return await this.fileService.saveBerkas(
        create_berkas_siswa,
        entityManager,
      );
    } catch (error) {
      throw error;
    }
  }

  private async createDataSiswa(
    siswa: Siswa,
    wali_siswa: WaliSiswa,
    akta: File,
    kartu_keluarga: File,
    foto: File,
    entityManager: EntityManager = this.entityManager,
  ): Promise<DataSiswa> {
    try {
      const createDataSiswa = this.dataSiswaService.createTransactionDataSiswa({
        akta,
        kartu_keluarga,
        foto,
        wali_siswa,
        siswa,
      });

      return await this.dataSiswaService.saveTransactionKelas(
        createDataSiswa,
        entityManager,
      );
    } catch (error) {
      throw error;
    }
  }

  async pendaftaranSiswa(
    user_id: string,
    data: IDataSiswa,
    berkas: {
      akta: Express.Multer.File;
      kartu_keluarga: Express.Multer.File;
      foto: Express.Multer.File;
    },
  ): Promise<IMessage> {
    try {
      const user = await this.userService.findOne(user_id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.entityManager.transaction(async (entityManager) => {
        Object.assign(data.siswa, { user });
        const siswa = await this.createSiswa(data, entityManager);
        const wali_siswa = await this.createWaliSiswa(data, entityManager);
        const berkas_siswa = await this.createBerkas(
          user_id,
          berkas.akta[0],
          berkas.kartu_keluarga[0],
          berkas.foto[0],
          entityManager,
        );

        await this.createDataSiswa(
          siswa,
          wali_siswa,
          berkas_siswa[0],
          berkas_siswa[1],
          berkas_siswa[2],
          entityManager,
        );
      });

      return {
        httpStatus: HttpStatus.OK,
        message: 'Pendaftaran berhasil silahkan selesaikan pembayaran.',
      };
    } catch (error) {
      throw error;
    }
  }
}
