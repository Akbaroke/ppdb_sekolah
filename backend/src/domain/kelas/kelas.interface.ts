import { TahunAjaran } from '../tahun-ajaran/tahun-ajaran.entity';

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
