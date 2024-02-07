import { ICreateTahunAjaran } from 'src/domain/tahun-ajaran/tahun-ajaran.interface';
export declare class CreateTahunAjaranDto implements ICreateTahunAjaran {
    biaya_daftar: number;
    tahun_ajaran: string;
    besar_spp: number;
    constructor(partial: Partial<CreateTahunAjaranDto>);
}
