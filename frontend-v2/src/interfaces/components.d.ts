interface FormType {
  nama_lengkap: string;
  tanggal_lahir: Date | null;
  jenis_kelamin: string;
  tinggi_badan: number;
  tempat_lahir: string;
  umur: string;
  agama: string;
  berat_badan: number;
  nama_ibu: string;
  nama_bapak: string;
  nama_wali: string;
  pekerjaan: string;
  no_telepon: string;
  alamat: string;
  akta: File | null;
  kartu_keluarga: File | null;
  foto: File | null;
  jenjang: string;
  tahun_ajaran: string;
}

export { FormType };
