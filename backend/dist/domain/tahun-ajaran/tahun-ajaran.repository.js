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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TahunAjaranRepository = void 0;
const common_1 = require("@nestjs/common");
const tahun_ajaran_entity_1 = require("./tahun-ajaran.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let TahunAjaranRepository = class TahunAjaranRepository {
    constructor(tahunAjaranRepository) {
        this.tahunAjaranRepository = tahunAjaranRepository;
    }
    async exists(tahun_ajaran) {
        return await this.tahunAjaranRepository.exists({ where: { tahun_ajaran } });
    }
    async findAll(limit, skip, latest) {
        const order = latest ? 'desc' : 'asc';
        const [data, count] = await this.tahunAjaranRepository.findAndCount({
            skip,
            take: limit,
            order: {
                created_at: order,
            },
        });
        return { data, count };
    }
    async findAllBysearch(limit, skip, latest, search) {
        const order = latest ? 'desc' : 'asc';
        const [data, count] = await this.tahunAjaranRepository.findAndCount({
            where: [
                {
                    tahun_ajaran: (0, typeorm_1.Like)(`%${search}%`),
                },
                {
                    besar_spp: Number(search) || 0,
                },
                {
                    biaya_daftar: Number(search) || 0,
                },
            ],
            skip,
            take: limit,
            order: {
                created_at: order,
            },
        });
        return { data, count };
    }
    async find(tahun_ajaran_id) {
        return await this.tahunAjaranRepository.findOne({
            where: { tahun_ajaran_id },
        });
    }
    async findByTahunAjaran(tahun_ajaran) {
        return await this.tahunAjaranRepository.findOne({
            where: {
                tahun_ajaran,
            },
        });
    }
};
exports.TahunAjaranRepository = TahunAjaranRepository;
exports.TahunAjaranRepository = TahunAjaranRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(tahun_ajaran_entity_1.TahunAjaran)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TahunAjaranRepository);
//# sourceMappingURL=tahun-ajaran.repository.js.map