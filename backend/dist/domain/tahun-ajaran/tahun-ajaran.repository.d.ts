import { TahunAjaran } from './tahun-ajaran.entity';
import { Repository } from 'typeorm';
import { ITahunAjaranRepository } from './tahun-ajaran.interface';
export declare class TahunAjaranRepository implements ITahunAjaranRepository {
    private readonly tahunAjaranRepository;
    constructor(tahunAjaranRepository: Repository<TahunAjaran>);
    exists(tahun_ajaran: string): Promise<boolean>;
    findAll(limit: number, skip: number, latest: boolean): Promise<{
        data: TahunAjaran[];
        count: number;
    }>;
    findAllBysearch(limit: number, skip: number, latest: boolean, search: string): Promise<{
        data: TahunAjaran[];
        count: number;
    }>;
    find(tahun_ajaran_id: string): Promise<TahunAjaran>;
    findByTahunAjaran(tahun_ajaran: string): Promise<TahunAjaran>;
}
