import { JENJANG } from './kelas.interface';
import { TahunAjaran } from '../tahun-ajaran/tahun-ajaran.entity';
interface IKelas {
    kelas_id: string;
    kelas: string;
    jenjang: JENJANG;
    kode_kelas: string;
    jumlah_siswa: number;
    tahun_ajaran: TahunAjaran;
    created_at: number;
    updated_at: number;
}
export declare class Kelas implements IKelas {
    kelas_id: string;
    kelas: string;
    jenjang: JENJANG;
    kode_kelas: string;
    jumlah_siswa: number;
    tahun_ajaran: TahunAjaran;
    created_at: number;
    updated_at: number;
}
export {};
