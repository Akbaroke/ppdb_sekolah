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
exports.UsecaseTahunAjaranService = void 0;
const common_1 = require("@nestjs/common");
const tahun_ajaran_service_1 = require("../../domain/tahun-ajaran/tahun-ajaran.service");
const pagination_service_1 = require("../services/pagination.service");
let UsecaseTahunAjaranService = class UsecaseTahunAjaranService {
    constructor(tahunAjaranService, paginationService) {
        this.tahunAjaranService = tahunAjaranService;
        this.paginationService = paginationService;
    }
    async checkTahunAjaran(id) {
        try {
            const data = await this.tahunAjaranService.getTahunAjaranById(id);
            if (!data) {
                throw new common_1.NotFoundException('Tahun ajaran tidak ditemukan');
            }
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const checkTahunAjaran = await this.tahunAjaranService.IsTahunAjaranExist(data.tahun_ajaran);
            if (checkTahunAjaran) {
                throw new common_1.ConflictException('Tahun ajaran sudah ada');
            }
            await this.tahunAjaranService.createTahunAjaran(data);
            return {
                httpStatus: common_1.HttpStatus.CREATED,
                message: 'Berhasil membuat tahun ajaran',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getById(id) {
        try {
            const data = await this.checkTahunAjaran(id);
            return {
                data,
                message: 'Tahun ajaran berhasil diambil',
                httpStatus: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, payload) {
        try {
            const tahun_ajaran = await this.checkTahunAjaran(id);
            await this.tahunAjaranService.updateTahunAjaran({
                ...payload,
                tahun_ajaran,
            });
            return {
                message: 'Berhasil merubah tahun ajaran.',
                httpStatus: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getAll(limit = 10, page = 1, latest = true, search = null) {
        try {
            if (page < 1 || limit < 1) {
                throw new common_1.BadRequestException('page minimal 1 dan limit minimal 1');
            }
            const { data, count, limit_item, start } = await this.tahunAjaranService.getAllTahunAjaran(limit, page, latest, search);
            const pagination = this.paginationService.createPagination(count, limit_item, page, start);
            return {
                httpStatus: common_1.HttpStatus.OK,
                message: 'Data kelas berhasil diambil',
                data,
                pagination,
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UsecaseTahunAjaranService = UsecaseTahunAjaranService;
exports.UsecaseTahunAjaranService = UsecaseTahunAjaranService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tahun_ajaran_service_1.TahunAjaranService,
        pagination_service_1.PaginationService])
], UsecaseTahunAjaranService);
//# sourceMappingURL=tahun-ajaran.service.js.map