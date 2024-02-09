export enum JENIS_KELAMIN {
  L = 'laki-laki',
  P = 'perempuan',
}

export enum AGAMA {
  ISLAM = 'islam',
  PROTESTAN = 'protestan',
  KATOLIK = 'katolik',
  HINDU = 'hindu',
  BUDDHA = 'buddha',
  KHONGHUCU = 'khanghucu',
}

export interface ICreateSiswa {
  agama: AGAMA;
  berat_badan: number;
  jenis_kelamin: JENIS_KELAMIN;
  nama: string;
  tanggal_lahir: Date;
  tempat_lahir: string;
  tinggi_badan: number;
  umur: number;
}
