interface Timestamp {
  created_at?: string;
  updated_at?: string;
}

export interface Pagination {
  currentPage: number;
  totalData: number;
  totalPage: number;
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
  kapasitas: number;
}

export interface PembayaranSPP {
  id: string;
  no_transaksi: string;
  tanggal: Date;
  nis: string;
  nama: string;
  kelas: string;
  spp_bulan: string;
  nominal: number;
  metode: string;
}