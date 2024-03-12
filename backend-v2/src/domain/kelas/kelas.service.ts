import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { KelasRepository } from './kelas.repository';
import { EntityManager, UpdateResult } from 'typeorm';
import { ICreateKelas, JENJANG } from './kelas.interface';
import { Kelas } from './kelas.entity';
import { TahunAjaran } from '../tahun-ajaran/tahun-ajaran.entity';

@Injectable()
export class KelasService {
  constructor(
    private readonly kelasRepository: KelasRepository,
    private readonly entityManager: EntityManager,
  ) {}

  private createTransactionKelas(data: ICreateKelas): Kelas {
    try {
      return this.entityManager.create(Kelas, {
        ...data,
      });
    } catch (error) {
      throw error;
    }
  }

  private async saveTransactionKelas(
    kelas: Kelas,
    entityManager: EntityManager = this.entityManager,
  ): Promise<Kelas> {
    try {
      return await entityManager.save(kelas);
    } catch (error) {
      throw error;
    }
  }

  private async updateTransactionKelas(
    kelas: Kelas,
    payload: Partial<
      Pick<
        Kelas,
        | 'jenjang'
        | 'tahun_ajaran'
        | 'kelas'
        | 'kode_kelas'
        | 'jumlah_siswa'
        | 'kapasitas'
      >
    >,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    try {
      return entityManager.update(
        Kelas,
        { kelas_id: kelas.kelas_id },
        payload || {},
      );
    } catch (error) {
      throw error;
    }
  }

  private async updateAllTransactionKelas(
    kelas_id: string,
    payload: Partial<
      Pick<
        Kelas,
        'jenjang' | 'tahun_ajaran' | 'kelas' | 'kode_kelas' | 'jumlah_siswa'
      >
    >,
    entityManager: EntityManager = this.entityManager,
  ): Promise<UpdateResult> {
    try {
      return entityManager.update(Kelas, { kelas_id: kelas_id }, payload || {});
    } catch (error) {
      throw error;
    }
  }

  private async findLastKelas(
    jenjang: JENJANG,
    tahun_ajaran: TahunAjaran,
    entityManager: EntityManager,
  ): Promise<Kelas> {
    try {
      const data = await entityManager.findOne(Kelas, {
        where: {
          jenjang,
          tahun_ajaran,
        },
        order: { kode_kelas: 'DESC' },
        lock: { mode: 'pessimistic_write' },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  private async findAllWithoutSearch(
    limit_item: number,
    start: number,
    latest: boolean,
  ): Promise<{
    limit_item: number;
    start: number;
    data: Kelas[];
    count: number;
  }> {
    try {
      const { data, count } = await this.kelasRepository.findAll(
        limit_item,
        start,
        latest,
      );

      return { limit_item, start, data, count };
    } catch (error) {
      throw error;
    }
  }

  private async findAllWithSearch(
    limit_item: number,
    start: number,
    latest: boolean,
    search: string,
  ): Promise<{
    limit_item: number;
    start: number;
    data: Kelas[];
    count: number;
  }> {
    try {
      const { data, count } = await this.kelasRepository.findAllBySearch(
        limit_item,
        start,
        latest,
        search,
      );

      return { limit_item, start, data, count };
    } catch (error) {
      throw error;
    }
  }

  async createKelas({
    jenjang,
    tahun_ajaran,
    kapasitas,
  }: Pick<
    ICreateKelas,
    'jenjang' | 'tahun_ajaran' | 'kapasitas'
  >): Promise<void> {
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
          kapasitas,
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
    search: string = undefined,
  ): Promise<{
    limit_item: number;
    start: number;
    data: Kelas[];
    count: number;
  }> {
    try {
      const limit_item = limit > 100 ? 100 : limit;
      const start = (page - 1) * limit_item;

      if (search === null || !search) {
        return await this.findAllWithoutSearch(limit_item, start, latest);
      } else {
        return await this.findAllWithSearch(limit_item, start, latest, search);
      }
    } catch (error) {
      throw error;
    }
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
    kapasitas: number,
  ): Promise<UpdateResult> {
    let no = 0;
    let kode_kelas = undefined;
    let kelas = undefined;
    try {
      const data = await this.entityManager.transaction(
        async (entityManager) => {
          const findKelas = await this.kelasRepository.find(kelas_id);

          if (!findKelas) {
            throw new NotFoundException('Kelas tidak ditemukan');
          }

          if (findKelas && findKelas.jumlah_siswa > 0) {
            throw new BadRequestException('Tidak dapat diupdate');
          }

          const findLastKelas = await this.findLastKelas(
            jenjang,
            tahun_ajaran,
            entityManager,
          );

          if (findLastKelas.kelas_id !== findKelas.kelas_id) {
            if (findLastKelas) {
              if (findLastKelas.jumlah_siswa > 0) {
                no = Number(findLastKelas.kode_kelas.split('-')[1]) + 1;
              } else {
                throw new BadRequestException('Tidak dapat diupdate');
              }
            } else {
              no = 1;
            }

            kode_kelas = `${jenjang}-${no}`;
            kelas = `kelas-${no}`;
          } else {
            kode_kelas = findKelas.kode_kelas;
            kelas = findKelas.kelas;
          }

          const payload = {
            jenjang,
            tahun_ajaran,
            kode_kelas,
            kelas,
            kapasitas,
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

  async getKelasAndLock(
    jenjang: JENJANG,
    tahun_ajaran_id: string,
    entityManager: EntityManager = this.entityManager,
  ): Promise<Kelas[]> {
    const kelas = await entityManager
      .createQueryBuilder(Kelas, 'kelas')
      .leftJoinAndSelect('kelas.tahun_ajaran', 'tahun_ajaran')
      .where('kelas.jenjang = :jenjang', { jenjang })
      .andWhere('tahun_ajaran.tahun_ajaran_id = :tahun_ajaran_id', {
        tahun_ajaran_id,
      })
      .andWhere('kelas.jumlah_siswa < kelas.kapasitas')
      .orderBy('kelas.created_at', 'ASC')
      .setLock('pessimistic_write')
      .getMany();

    return kelas;
  }

  async addJumlahSiswa(
    kelas: Kelas,
    jumlah_siswa: number,
    entityManager: EntityManager = this.entityManager,
  ) {
    try {
      await this.updateTransactionKelas(
        kelas,
        {
          kapasitas: kelas.kapasitas,
          jumlah_siswa: kelas.jumlah_siswa + jumlah_siswa,
        },
        entityManager,
      );
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
