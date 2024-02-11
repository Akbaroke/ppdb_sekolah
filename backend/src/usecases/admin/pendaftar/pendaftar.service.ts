import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { STATUS_SISWA } from 'src/domain/data-siswa/data_siswa.interface';
import { DataSiswaService } from 'src/domain/data-siswa/data_siswa.service';
import { JENJANG } from 'src/domain/kelas/kelas.interface';
import { KelasService } from 'src/domain/kelas/kelas.service';
import { IMessage } from 'src/usecases/message.interface';
import { EntityManager } from 'typeorm';

@Injectable()
export class PendaftaranService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly dataSiswaService: DataSiswaService,
    private readonly kelasService: KelasService,
  ) {}

  async acc(siswa_id: string, kelas_id: string): Promise<IMessage> {
    let nis: string;
    try {
      await this.entityManager.transaction(async (entityManager) => {
        const kelas = await this.kelasService.getKelasAndLock(
          kelas_id,
          entityManager,
        );

        const data_siswa = await this.dataSiswaService.getOneByDataSiswaId(
          siswa_id,
          true,
        );

        if (data_siswa.status !== STATUS_SISWA.PENDAFTAR) {
          throw new BadRequestException('Siswa sudah di acc');
        }

        if (!data_siswa) {
          throw new NotFoundException('Siswa tidak ditemukan');
        }

        if (!kelas) {
          throw new NotFoundException('Kelas tidak ditemukan');
        }

        if (
          Number(kelas.tahun_ajaran.tahun_ajaran.split('/')[0]) <
          Number(`20${data_siswa.no_pendaftaran.slice(0, 2)}`)
        ) {
          throw new BadRequestException(
            'Tahun ajaran kelas tidak sesuai dengan tahun ajaran siswa',
          );
        }

        if (kelas.jenjang === JENJANG.PG) {
          nis = '101';
        } else if (kelas.jenjang === JENJANG.TKA) {
          nis = '201';
        } else if (kelas.jenjang === JENJANG.TKB) {
          nis = '301';
        }

        nis += `${data_siswa.no_pendaftaran.slice(
          -4,
        )}${kelas.tahun_ajaran.tahun_ajaran.slice(-2)}`;

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
}
