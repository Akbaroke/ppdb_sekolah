import { CreateTahunAjaranDto } from './dtos/create-tahun-ajaran.dto';
import { UsecaseTahunAjaranService } from './tahun-ajaran.service';
import { UpdateTahunAjaranDto } from './dtos/update-tahun-ajaran.dto';
export declare class TahunAjaranController {
    private readonly tahunAjaranService;
    constructor(tahunAjaranService: UsecaseTahunAjaranService);
    create_tahun_ajaran(body: CreateTahunAjaranDto): Promise<import("../message.interface").IMessage>;
    update_tahun_ajaran(id: string, body: UpdateTahunAjaranDto): Promise<import("../message.interface").IMessage>;
    get_all_tahun_ajaran(limit?: number, page?: number, latest?: boolean, search?: string): Promise<import("../message.interface").IMessage & {
        data?: import("../../domain/tahun-ajaran/tahun-ajaran.entity").TahunAjaran[];
        pagination?: object;
    }>;
    get_tahun_ajaran_by_id(id: string): Promise<import("../message.interface").IMessage & {
        data: import("../../domain/tahun-ajaran/tahun-ajaran.entity").TahunAjaran;
    }>;
}
