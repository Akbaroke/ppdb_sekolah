import { Kelas } from '../kelas/kelas.entity';
interface ITahunAjaran {
    tahun_ajaran_id: string;
    tahun_ajaran: string;
    besar_spp: number;
    biaya_daftar: number;
    created_at: number;
    updated_at: number;
}
export declare class TahunAjaran implements ITahunAjaran {
    tahun_ajaran_id: string;
    tahun_ajaran: string;
    besar_spp: number;
    biaya_daftar: number;
    kelas: Kelas;
    created_at: number;
    updated_at: number;
}
export {};
