import { KelasRepository } from './kelas.repository';
import { EntityManager, UpdateResult } from 'typeorm';
import { ICreateKelas, IKelasService, JENJANG } from './kelas.interface';
import { Kelas } from './kelas.entity';
import { TahunAjaran } from '../tahun-ajaran/tahun-ajaran.entity';
export declare class KelasService implements IKelasService {
    private readonly kelasRepository;
    private readonly entityManager;
    constructor(kelasRepository: KelasRepository, entityManager: EntityManager);
    private createTransactionKelas;
    private saveTransactionKelas;
    private updateTransactionKelas;
    private findLastKelas;
    private findAllWithoutSearch;
    private findAllWithSearch;
    createKelas({ jenjang, tahun_ajaran, }: Pick<ICreateKelas, 'jenjang' | 'tahun_ajaran'>): Promise<void>;
    getAllKelas(limit: number, page: number, latest: boolean, search?: string): Promise<{
        limit_item: number;
        start: number;
        data: Kelas[];
        count: number;
    }>;
    getKelasById(kelas_id: string): Promise<Kelas>;
    updateKelas(kelas_id: string, jenjang: JENJANG, tahun_ajaran: TahunAjaran): Promise<UpdateResult>;
    deleteKelas(kelas_id: string): Promise<void>;
}
