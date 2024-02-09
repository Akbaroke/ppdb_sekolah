import { Injectable } from '@nestjs/common';
import { WaliSiswaRepository } from './wali-siswa.repository';
import { EntityManager } from 'typeorm';
import { WaliSiswa } from './wali-siswa.entity';
import { ICreateWaliSiswa } from './wali-siswa.interface';

@Injectable()
export class WaliSiswaService {
  constructor(
    private readonly waliSiswaRepository: WaliSiswaRepository,
    private readonly entityManager: EntityManager,
  ) {}

  createTransactionWali(data: ICreateWaliSiswa): WaliSiswa {
    return this.entityManager.create(WaliSiswa, {
      ...data,
    });
  }

  async saveTransactionWali(
    waliSiswa: WaliSiswa,
    entityManager: EntityManager = this.entityManager,
  ): Promise<WaliSiswa> {
    return await entityManager.save(waliSiswa);
  }
}
