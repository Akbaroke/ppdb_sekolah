interface Timestamp {
  created_at?: string;
  updated_at?: string;
}

export interface DataUser {
  isLogin: boolean;
  email: string;
  role: string;
  token: string;
}

export interface TahunAjaran extends Timestamp {
  // id: string;
  tahun_ajaran_id: string;
  tahun_ajaran: string;
  biaya_daftar: number;
  besar_spp: number;
}

export interface Kelas extends Timestamp {
  id: string;
  jenjang: string;
  kelas: string;
  kode_kelas: string;
  tahun_ajaran: string;
  jumlah_siswa: number;
}
