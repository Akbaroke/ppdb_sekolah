"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsecaseKelasService = void 0;
const common_1 = require("@nestjs/common");
const kelas_service_1 = require("../../domain/kelas/kelas.service");
const tahun_ajaran_service_1 = require("../../domain/tahun-ajaran/tahun-ajaran.service");
const pagination_service_1 = require("../services/pagination.service");
let UsecaseKelasService = class UsecaseKelasService {
    constructor(kelasService, tahunAjaranService, paginationService) {
        this.kelasService = kelasService;
        this.tahunAjaranService = tahunAjaranService;
        this.paginationService = paginationService;
    }
    async getTahunAjaran(tahun_ajaran) {
        try {
            const data = await this.tahunAjaranService.findTahunAjaran(tahun_ajaran);
            if (!data) {
                throw new common_1.NotFoundException('Tahun ajaran tidak ada');
            }
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    mapResponseData(kelas) {
        try {
            const data = kelas.map((value) => ({
                id: value.kelas_id,
                jenjang: value.jenjang,
                jumlah_siswa: value.jumlah_siswa,
                kelas: value.kelas,
                tahun_ajaran: value.tahun_ajaran?.tahun_ajaran,
                kode_kelas: value.kode_kelas,
                created_at: value.created_at,
                updated_at: value.updated_at,
            }));
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async createKelas(jenjang, tahun_ajaran) {
        try {
            const findTahunAjaran = await this.getTahunAjaran(tahun_ajaran);
            await this.kelasService.createKelas({
                jenjang,
                tahun_ajaran: findTahunAjaran,
            });
            return {
                httpStatus: common_1.HttpStatus.OK,
                message: 'Kelas berhasil dibuat',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getAllKelas(limit = 10, page = 1, latest = true, search = null) {
        try {
            if (page < 1 || limit < 1) {
                throw new common_1.BadRequestException('page minimal 1 dan limit minimal 1');
            }
            const { data, count, limit_item, start } = await this.kelasService.getAllKelas(limit, page, latest, search);
            const res = this.mapResponseData(data);
            const pagination = this.paginationService.createPagination(count, limit_item, page, start);
            return {
                httpStatus: common_1.HttpStatus.OK,
                message: 'Data kelas berhasil diambil',
                data: res,
                pagination,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getKelas(kelas_id) {
        try {
            const getData = await this.kelasService.getKelasById(kelas_id);
            if (!getData) {
                throw new common_1.NotFoundException('Kelas tidak ditemukan');
            }
            const data = this.mapResponseData([getData]);
            return {
                message: 'Data kelas berhasil diambil',
                httpStatus: common_1.HttpStatus.OK,
                data: data[0],
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateKelas(kelas_id, jenjang, tahun_ajaran) {
        try {
            const findTahunAjaran = await this.getTahunAjaran(tahun_ajaran);
            await this.kelasService.updateKelas(kelas_id, jenjang, findTahunAjaran);
            return {
                httpStatus: common_1.HttpStatus.OK,
                message: 'Kelas berhasil diupdate',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteKelas(kelas_id) {
        try {
            await this.kelasService.deleteKelas(kelas_id);
            return {
                httpStatus: common_1.HttpStatus.OK,
                message: 'Kelas berhasil di hapus',
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UsecaseKelasService = UsecaseKelasService;
exports.UsecaseKelasService = UsecaseKelasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kelas_service_1.KelasService,
        tahun_ajaran_service_1.TahunAjaranService,
        pagination_service_1.PaginationService])
], UsecaseKelasService);
//# sourceMappingURL=kelas.service.js.map