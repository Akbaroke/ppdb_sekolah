import { TahunAjaranRepository } from './tahun-ajaran.repository';
import { EntityManager } from 'typeorm';
import { TahunAjaran } from './tahun-ajaran.entity';
import { ICreateTahunAjaran, ITahunAjaranService } from './tahun-ajaran.interface';
export declare class TahunAjaranService implements ITahunAjaranService {
    private readonly tahunAjaranRepository;
    private readonly entityManager;
    constructor(tahunAjaranRepository: TahunAjaranRepository, entityManager: EntityManager);
    private createTransactionTahunAjaran;
    private saveTransactionTahunAjaran;
    private findTahunAjaranById;
    private findAllTahunAjaranWithoutSearch;
    private findAllTahunAjaranWithSearch;
    IsTahunAjaranExist(tahun_ajaran: string): Promise<boolean>;
    createTahunAjaran(data: ICreateTahunAjaran): Promise<void>;
    updateTahunAjaran({ tahun_ajaran, besar_spp, biaya_daftar, }: Omit<ICreateTahunAjaran, 'tahun_ajaran'> & {
        tahun_ajaran: TahunAjaran;
    }, entityManager?: EntityManager): Promise<void>;
    getAllTahunAjaran(limit: number, page: number, latest: boolean, search?: string): Promise<{
        limit_item: number;
        start: number;
        data: TahunAjaran[];
        count: number;
    }>;
    getTahunAjaranById(id: string): Promise<TahunAjaran>;
    findTahunAjaran(tahun_ajaran: string): Promise<TahunAjaran>;
}
