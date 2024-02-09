import { ICreateSiswa } from 'src/domain/siswa/siswa.interface';
import { ICreateWaliSiswa } from 'src/domain/wali-siswa/wali-siswa.interface';

export interface IDataSiswa {
  siswa: ICreateSiswa;
  wali_siswa: ICreateWaliSiswa;
}
