import { STATUS_SISWA } from 'src/domain/data-siswa/data_siswa.interface';
import { JENJANG } from 'src/domain/kelas/kelas.interface';
import { ICreateSiswa, JENIS_KELAMIN } from 'src/domain/siswa/siswa.interface';
import { ICreateWaliSiswa } from 'src/domain/wali-siswa/wali-siswa.interface';

export interface IDataSiswa {
  siswa: ICreateSiswa;
  wali_siswa: ICreateWaliSiswa;
  tahun_ajaran: string;
  jenjang: JENJANG;
}

export interface ITransformedDataSiswa {
  id: string;
  imgUrl: string;
  nama: string;
  jenis_kelamin: JENIS_KELAMIN;
  status: STATUS_SISWA;
  tahun_ajaran: string;
  jenjang: JENJANG;
  created_at: number;
  kelas?: string;
  nis?: string;
  no_pendaftaran: string;
}
