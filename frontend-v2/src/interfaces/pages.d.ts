interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
    status: number;
  };
}

interface SiswaResponse {
  id: string;
  imgUrl: string;
  nama: string;
  jenis_kelamin: string;
  status: string;
  tahun_ajaran: string;
  nis: string;
  no_pendaftaran: string;
  jenjang: string;
  kelas: string;
}

interface SiswaDetailResponse {
  id: string;
  status: string;
  siswa: {
    nama: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    umur: number;
    jenis_kelamin: string;
    agama: string;
    tinggi_badan: number;
    berat_badan: number;
  };
  wali: {
    nama_ibu: string;
    nama_bapak: string;
    nama_wali: string;
    pekerjaan: string;
    no_telepon: string;
    alamat: string;
  };
  berkas: {
    akta: string;
    kartu_keluarga: string;
    foto: string;
  };
  jenjang: 'tka';
  tahun_ajaran: '2024/2025';
}

interface DataStatus {
  status: string;
  foto: string;
  tahun_ajaran: string;
  no_pendaftaran: string;
  tgl_daftar: string;
  jenjang: string;
  kelas?: string;
  biaya_pendaftaran: string;
  status_bayar: boolean;
  nis?: string;
}

export { ErrorResponse, SiswaResponse, SiswaDetailResponse, DataStatus };
