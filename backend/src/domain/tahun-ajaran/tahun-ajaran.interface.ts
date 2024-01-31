import { IMessage } from 'src/usecases/message.interface';
import { TahunAjaran } from './tahun-ajaran.entity';

export interface ICreateTahunAjaran {
  tahun_ajaran: string;
  besar_spp: number;
  biaya_daftar: number;
}

export interface ITahunAjaranRepository {
  exists(tahun_ajaran: string): Promise<boolean>;
  findAll(): Promise<TahunAjaran[]>;
  find(tahun_ajaran_id: string): Promise<TahunAjaran>;
}

export interface ITahunAjaranService {
  createTahunAjaran(data: ICreateTahunAjaran): Promise<IMessage>;
  getAllTahunAjaran(): Promise<IMessage & { data?: TahunAjaran[] }>;
  getTahunAjaranById(id: string): Promise<IMessage & { data: TahunAjaran }>;
}
