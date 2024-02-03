import { IMessage } from '../message.interface';
import { JENJANG } from 'src/domain/kelas/kelas.interface';

export interface IResponseDataKelas {
  id: string;
  jenjang: string;
  jumlah_siswa: number;
  kelas: string;
  tahun_ajaran: string;
  kode_kelas: string;
  created_at: number;
  updated_at: number;
}

export interface IUsecaseKelasService {
  createKelas(jenjang: JENJANG, tahun_ajaran: string): Promise<IMessage>;
  getAllKelas(): Promise<IMessage & { data?: IResponseDataKelas[] }>;
  getKelas(kelas_id: string): Promise<IMessage & { data: IResponseDataKelas }>;
  deleteKelas(kelas_id: string): Promise<IMessage>;
  updateKelas(
    kelas_id: string,
    jenjang: JENJANG,
    tahun_ajaran: string,
  ): Promise<IMessage>;
}
