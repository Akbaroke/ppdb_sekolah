import { UsecaseKelasService as KelasService } from './kelas.service';
import { CreateKelasDto } from './dtos/create-kelas.dto';
import { UpdateKelasDto } from './dtos/update-kelas.dto';
export declare class KelasController {
    private readonly kelasService;
    constructor(kelasService: KelasService);
    create_kelas({ jenjang, tahun_ajaran }: CreateKelasDto): Promise<import("../message.interface").IMessage>;
    get_all_kelas(limit?: number, page?: number, latest?: boolean, search?: string): Promise<import("../message.interface").IMessage & {
        data?: import("./kelas.interface").IResponseDataKelas[];
        pagination?: object;
    }>;
    get_kelas_by_id(id: string): Promise<import("../message.interface").IMessage & {
        data: import("./kelas.interface").IResponseDataKelas;
    }>;
    update_kelas(id: string, { jenjang, tahun_ajaran }: UpdateKelasDto): Promise<import("../message.interface").IMessage>;
    delete_kelas(id: string): Promise<import("../message.interface").IMessage>;
}
