import { JENJANG } from '../kelas/kelas.interface';
import { Siswa } from '../siswa/siswa.entity';
import { TahunAjaran } from '../tahun-ajaran/tahun-ajaran.entity';
import { WaliSiswa } from '../wali-siswa/wali-siswa.entity';
import { File } from '../file/file.entity';

export interface ICreateDataSiswa {
  akta: File;
  foto: File;
  kartu_keluarga: File;
  siswa: Siswa;
  wali_siswa: WaliSiswa;
  jenjang: JENJANG;
  tahun_ajaran: TahunAjaran;
}

export enum STATUS_SISWA {
  PENDAFTAR = 'pendaftar',
  SISWA = 'siswa',
  KELUAR = 'keluar',
  LULUS = 'lulus',
}
