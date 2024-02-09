import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { DataSiswa } from './data_siswa.entity';
import { File } from '../file/file.entity';
import { Siswa } from '../siswa/siswa.entity';
import { WaliSiswa } from '../wali-siswa/wali-siswa.entity';

interface ICreateDataSiswa {
  akta: File;
  foto: File;
  kartu_keluarga: File;
  siswa: Siswa;
  wali_siswa: WaliSiswa;
}

@Injectable()
export class DataSiswaService {
  constructor(private readonly entityManager: EntityManager) {}

  createTransactionDataSiswa(data: ICreateDataSiswa): DataSiswa {
    return this.entityManager.create(DataSiswa, { ...data });
  }

  async saveTransactionKelas(
    data_siswa: DataSiswa,
    entityManager: EntityManager = this.entityManager,
  ): Promise<DataSiswa> {
    return await entityManager.save(data_siswa);
  }
}
