import { Repository } from 'typeorm';
import { Kelas } from './kelas.entity';
import { TahunAjaran } from '../tahun-ajaran/tahun-ajaran.entity';
import { IKelasRepository, JENJANG } from './kelas.interface';
export declare class KelasRepository implements IKelasRepository {
    private readonly kelasRepository;
    constructor(kelasRepository: Repository<Kelas>);
    countKelas(jenjang: JENJANG, tahun_ajaran: TahunAjaran): Promise<number>;
    findAll(limit: number, skip: number, latest: boolean): Promise<{
        data: Kelas[];
        count: number;
    }>;
    findAllBySearch(limit: number, skip: number, latest: boolean, search: string): Promise<{
        data: Kelas[];
        count: number;
    }>;
    find(id: string): Promise<Kelas>;
}
