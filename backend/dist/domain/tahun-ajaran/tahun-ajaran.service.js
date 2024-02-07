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
exports.TahunAjaranService = void 0;
const common_1 = require("@nestjs/common");
const tahun_ajaran_repository_1 = require("./tahun-ajaran.repository");
const typeorm_1 = require("typeorm");
const tahun_ajaran_entity_1 = require("./tahun-ajaran.entity");
let TahunAjaranService = class TahunAjaranService {
    constructor(tahunAjaranRepository, entityManager) {
        this.tahunAjaranRepository = tahunAjaranRepository;
        this.entityManager = entityManager;
    }
    createTransactionTahunAjaran(data) {
        return this.entityManager.create(tahun_ajaran_entity_1.TahunAjaran, {
            ...data,
        });
    }
    async saveTransactionTahunAjaran(tahunAjaran, entityManager = this.entityManager) {
        return await entityManager.save(tahunAjaran);
    }
    async findTahunAjaranById(id) {
        const data = await this.tahunAjaranRepository.find(id);
        return data;
    }
    async findAllTahunAjaranWithoutSearch(limit_item, start, latest) {
        try {
            const { data, count } = await this.tahunAjaranRepository.findAll(limit_item, start, latest);
            return { limit_item, start, data, count };
        }
        catch (error) {
            throw error;
        }
    }
    async findAllTahunAjaranWithSearch(limit_item, start, latest, search) {
        try {
            const { data, count } = await this.tahunAjaranRepository.findAllBysearch(limit_item, start, latest, search);
            return { limit_item, start, data, count };
        }
        catch (error) {
            throw error;
        }
    }
    async IsTahunAjaranExist(tahun_ajaran) {
        const isTahunAjaranExist = await this.tahunAjaranRepository.exists(tahun_ajaran);
        return isTahunAjaranExist;
    }
    async createTahunAjaran(data) {
        try {
            await this.entityManager.transaction(async (entityManager) => {
                const tahunAjaran = this.createTransactionTahunAjaran(data);
                await this.saveTransactionTahunAjaran(tahunAjaran, entityManager);
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateTahunAjaran({ tahun_ajaran, besar_spp, biaya_daftar, }, entityManager = this.entityManager) {
        try {
            await entityManager.update(tahun_ajaran_entity_1.TahunAjaran, tahun_ajaran, {
                besar_spp,
                biaya_daftar,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getAllTahunAjaran(limit, page, latest, search = null) {
        try {
            const limit_item = limit > 20 ? 20 : limit;
            const start = (page - 1) * limit_item;
            if (search === null) {
                return await this.findAllTahunAjaranWithoutSearch(limit_item, start, latest);
            }
            else {
                return await this.findAllTahunAjaranWithSearch(limit_item, start, latest, search);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getTahunAjaranById(id) {
        return await this.findTahunAjaranById(id);
    }
    async findTahunAjaran(tahun_ajaran) {
        const data = await this.tahunAjaranRepository.findByTahunAjaran(tahun_ajaran);
        return data;
    }
};
exports.TahunAjaranService = TahunAjaranService;
exports.TahunAjaranService = TahunAjaranService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tahun_ajaran_repository_1.TahunAjaranRepository,
        typeorm_1.EntityManager])
], TahunAjaranService);
//# sourceMappingURL=tahun-ajaran.service.js.map