import { TahunAjaran } from './tahun-ajaran.entity';

export interface ICreateTahunAjaran {
  tahun_ajaran: string;
  besar_spp: number;
  biaya_daftar: number;
}

export interface ITahunAjaranRepository {
  exists(tahun_ajaran: string): Promise<boolean>;
  findAll(
    limit: number,
    skip: number,
    latest: boolean,
  ): Promise<{ data: TahunAjaran[]; count: number }>;
  find(tahun_ajaran_id: string): Promise<TahunAjaran>;
  findAllBysearch(
    limit: number,
    skip: number,
    latest: boolean,
    search: string,
  ): Promise<{ data: TahunAjaran[]; count: number }>;
}

export interface ITahunAjaranService {
  IsTahunAjaranExist(tahun_ajaran: string): Promise<boolean>;
  createTahunAjaran(data: ICreateTahunAjaran): Promise<void>;
  getAllTahunAjaran(
    limit: number,
    page: number,
    latest: boolean,
    search: string,
  ): Promise<{
    limit_item: number;
    start: number;
    data: TahunAjaran[];
    count: number;
  }>;
  getTahunAjaranById(id: string): Promise<TahunAjaran>;
}
