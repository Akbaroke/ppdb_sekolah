import { Injectable } from '@nestjs/common';
import { SiswaRepository } from './siswa.repository';
import { EntityManager } from 'typeorm';
import { Siswa } from './siswa.entity';
import { ICreateSiswa } from './siswa.interface';

@Injectable()
export class SiswaService {
  constructor(
    private readonly siswaRepository: SiswaRepository,
    private readonly entityManager: EntityManager,
  ) {}

  createTransactionSiswa(data: ICreateSiswa): Siswa {
    return this.entityManager.create(Siswa, {
      ...data,
    });
  }

  async saveTransactionSiswa(
    siswa: Siswa,
    entityManager: EntityManager = this.entityManager,
  ): Promise<Siswa> {
    return await entityManager.save(siswa);
  }
}
