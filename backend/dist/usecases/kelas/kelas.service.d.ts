import { JENJANG } from 'src/domain/kelas/kelas.interface';
import { KelasService } from 'src/domain/kelas/kelas.service';
import { TahunAjaranService } from 'src/domain/tahun-ajaran/tahun-ajaran.service';
import { IMessage } from '../message.interface';
import { IResponseDataKelas, IUsecaseKelasService } from './kelas.interface';
import { PaginationService } from '../services/pagination.service';
export declare class UsecaseKelasService implements IUsecaseKelasService {
    private kelasService;
    private tahunAjaranService;
    private paginationService;
    constructor(kelasService: KelasService, tahunAjaranService: TahunAjaranService, paginationService: PaginationService);
    private getTahunAjaran;
    private mapResponseData;
    createKelas(jenjang: JENJANG, tahun_ajaran: string): Promise<IMessage>;
    getAllKelas(limit?: number, page?: number, latest?: boolean, search?: any): Promise<IMessage & {
        data?: IResponseDataKelas[];
        pagination?: object;
    }>;
    getKelas(kelas_id: string): Promise<IMessage & {
        data: IResponseDataKelas;
    }>;
    updateKelas(kelas_id: string, jenjang: JENJANG, tahun_ajaran: string): Promise<IMessage>;
    deleteKelas(kelas_id: string): Promise<IMessage>;
}
