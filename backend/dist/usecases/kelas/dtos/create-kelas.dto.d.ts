import { JENJANG } from 'src/domain/kelas/kelas.interface';
export declare class CreateKelasDto {
    jenjang: JENJANG;
    tahun_ajaran: string;
    constructor(partial: Partial<CreateKelasDto>);
}
