import { TahunAjaran } from '../tahun-ajaran/tahun-ajaran.entity';

export enum JENJANG {
  PG = 'pg',
  TKA = 'tka',
  TKB = 'tkb',
}

export interface ICreateKelas {
  maksimal_jumlah_siswa: number;
  jenjang: JENJANG;
  kelas: string;
  kode_kelas: string;
  tahun_ajaran: TahunAjaran;
  jumlah_siswa: number;
}
