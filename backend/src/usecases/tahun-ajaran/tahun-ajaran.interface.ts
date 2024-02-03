import { ICreateTahunAjaran } from 'src/domain/tahun-ajaran/tahun-ajaran.interface';
import { IMessage } from '../message.interface';
import { TahunAjaran } from 'src/domain/tahun-ajaran/tahun-ajaran.entity';

export interface IUsecaseTahunAjaranService {
  create(data: ICreateTahunAjaran): Promise<IMessage>;
  getById(id: string): Promise<IMessage & { data: TahunAjaran }>;
  getAll(): Promise<IMessage & { data?: TahunAjaran[]; pagination?: object }>;
}
