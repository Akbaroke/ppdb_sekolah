import { UpdateResult } from 'typeorm';
import { TahunAjaran } from '../tahun-ajaran/tahun-ajaran.entity';
import { Kelas } from './kelas.entity';

export enum JENJANG {
  PG = 'pg',
  TKA = 'tka',
  TKB = 'tkb',
}

export interface ICreateKelas {
  jenjang: JENJANG;
  kelas: string;
  kode_kelas: string;
  tahun_ajaran: TahunAjaran;
  jumlah_siswa: number;
}

export interface IKelasRepository {
  countKelas(jenjang: JENJANG, tahun_ajaran: TahunAjaran): Promise<number>;
  findAll(): Promise<Kelas[]>;
  find(id: string): Promise<Kelas>;
}

export interface IKelasService {
  createKelas({
    jenjang,
    tahun_ajaran,
  }: Pick<ICreateKelas, 'jenjang' | 'tahun_ajaran'>): Promise<void>;
  getAllKelas(): Promise<Kelas[]>;
  getKelasById(kelas_id: string): Promise<Kelas>;
  updateKelas(
    kelas_id: string,
    jenjang: JENJANG,
    tahun_ajaran: TahunAjaran,
  ): Promise<UpdateResult>;
  deleteKelas(kelas_id: string): Promise<void>;
}
