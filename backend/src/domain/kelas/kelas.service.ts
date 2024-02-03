import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { KelasRepository } from './kelas.repository';
import { EntityManager, UpdateResult } from 'typeorm';
import { ICreateKelas, IKelasService, JENJANG } from './kelas.interface';
import { Kelas } from './kelas.entity';
import { TahunAjaran } from '../tahun-ajaran/tahun-ajaran.entity';

@Injectable()
export class KelasService implements IKelasService {
  constructor(
    private readonly kelasRepository: KelasRepository,
    private readonly entityManager: EntityManager,
  ) {}

  private createTransactionKelas(data: ICreateKelas): Kelas {
    return this.entityManager.create(Kelas, {
      ...data,
    });
  }

  private async saveTransactionKelas(
    kelas: Kelas,
    entityManager: EntityManager = this.entityManager,
  ): Promise<Kelas> {
    return await entityManager.save(kelas);
  }

  private async updateTransactionKelas(
    kelas: Kelas,
    payload: Partial<
      Pick<Kelas, 'jenjang' | 'tahun_ajaran' | 'kelas' | 'kode_kelas'>
    >,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    return entityManager.update(Kelas, kelas, payload || {});
  }

  private async findLastKelas(
    jenjang: JENJANG,
    tahun_ajaran: TahunAjaran,
    entityManager: EntityManager,
  ): Promise<Kelas> {
    const data = await entityManager.findOne(Kelas, {
      where: { jenjang, tahun_ajaran },
      order: { kode_kelas: 'DESC' },
      lock: { mode: 'pessimistic_write' },
    });

    return data;
  }

  async createKelas({
    jenjang,
    tahun_ajaran,
  }: Pick<ICreateKelas, 'jenjang' | 'tahun_ajaran'>): Promise<void> {
    let no = 0;
    try {
      await this.entityManager.transaction(async (entityManager) => {
        const countKelas = await this.kelasRepository.countKelas(
          jenjang,
          tahun_ajaran,
        );

        if (countKelas === 0) {
          no = 1;
        }

        if (countKelas > 0) {
          const findLastKelas = await this.findLastKelas(
            jenjang,
            tahun_ajaran,
            entityManager,
          );

          if (findLastKelas.jumlah_siswa > 0) {
            no = countKelas + 1;
          } else {
            throw new BadRequestException('Tidak bisa membuat kelas');
          }
        }

        const kode_kelas = `${jenjang}-${no}`;
        const kelas = `kelas-${no}`;
        const jumlah_siswa = 0;

        const createKelas = this.createTransactionKelas({
          jenjang,
          jumlah_siswa,
          kelas,
          kode_kelas,
          tahun_ajaran,
        });

        await this.saveTransactionKelas(createKelas, entityManager);
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllKelas(
    limit: number,
    page: number,
    latest: boolean,
  ): Promise<{
    limit_item: number;
    start: number;
    data: Kelas[];
    count: number;
  }> {
    const limit_item = limit > 20 ? 20 : limit;
    const start = (page - 1) * limit_item;

    const { data, count } = await this.kelasRepository.findAll(
      limit_item,
      start,
      latest,
    );

    return { limit_item, start, data, count };
  }

  async getKelasById(kelas_id: string): Promise<Kelas> {
    try {
      const data = await this.kelasRepository.find(kelas_id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateKelas(
    kelas_id: string,
    jenjang: JENJANG,
    tahun_ajaran: TahunAjaran,
  ): Promise<UpdateResult> {
    let no = 0;
    try {
      const data = await this.entityManager.transaction(
        async (entityManager) => {
          const findKelas = await this.kelasRepository.find(kelas_id);

          if (!findKelas) {
            throw new NotFoundException('Kelas tidak ditemukan');
          }

          if (findKelas && findKelas.jumlah_siswa > 0) {
            console.log('kesini1');
            throw new BadRequestException('Tidak dapat diupdate');
          }

          const findLastKelas = await this.findLastKelas(
            jenjang,
            tahun_ajaran,
            entityManager,
          );

          if (findLastKelas) {
            if (findLastKelas.jumlah_siswa > 0) {
              no = Number(findLastKelas.kode_kelas.split('-')[1]) + 1;
            } else {
              console.log('kesini2');
              throw new BadRequestException('Tidak dapat diupdate');
            }
          } else {
            no = 1;
          }

          const kode_kelas = `${jenjang}-${no}`;
          const kelas = `kelas-${no}`;
          const payload = {
            jenjang,
            tahun_ajaran,
            kode_kelas,
            kelas,
          };

          return await this.updateTransactionKelas(
            findKelas,
            payload,
            entityManager,
          );
        },
      );

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteKelas(kelas_id: string): Promise<void> {
    try {
      const findKelas = await this.kelasRepository.find(kelas_id);

      if (!findKelas) {
        throw new NotFoundException('Kelas tidak ditemukan');
      }

      if (findKelas && findKelas.jumlah_siswa > 0) {
        throw new BadRequestException('Tidak dapat diupdate');
      }

      await this.entityManager.delete(Kelas, { kelas_id });
    } catch (error) {
      throw error;
    }
  }
}
