import { User } from '../user/user.entity';

export interface ICreateWaliSiswa {
  alamat: string;
  nama_bapak: string;
  nama_ibu: string;
  nama_wali?: string | null;
  no_telepon: string;
  pekerjaan: string;
}

export interface IPayloadWaliSiswa extends ICreateWaliSiswa {
  user: User;
}
