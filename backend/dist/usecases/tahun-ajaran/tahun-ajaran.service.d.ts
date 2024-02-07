import { ICreateTahunAjaran } from 'src/domain/tahun-ajaran/tahun-ajaran.interface';
import { TahunAjaranService } from 'src/domain/tahun-ajaran/tahun-ajaran.service';
import { IMessage } from '../message.interface';
import { TahunAjaran } from 'src/domain/tahun-ajaran/tahun-ajaran.entity';
import { PaginationService } from '../services/pagination.service';
import { IUsecaseTahunAjaranService } from './tahun-ajaran.interface';
export declare class UsecaseTahunAjaranService implements IUsecaseTahunAjaranService {
    private readonly tahunAjaranService;
    private readonly paginationService;
    constructor(tahunAjaranService: TahunAjaranService, paginationService: PaginationService);
    private checkTahunAjaran;
    create(data: ICreateTahunAjaran): Promise<IMessage>;
    getById(id: string): Promise<IMessage & {
        data: TahunAjaran;
    }>;
    update(id: string, payload: Omit<ICreateTahunAjaran, 'tahun_ajaran'>): Promise<IMessage>;
    getAll(limit?: number, page?: number, latest?: boolean, search?: string): Promise<IMessage & {
        data?: TahunAjaran[];
        pagination?: object;
    }>;
}
