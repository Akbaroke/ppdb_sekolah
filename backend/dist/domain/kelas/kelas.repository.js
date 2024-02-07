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
exports.KelasRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const kelas_entity_1 = require("./kelas.entity");
let KelasRepository = class KelasRepository {
    constructor(kelasRepository) {
        this.kelasRepository = kelasRepository;
    }
    async countKelas(jenjang, tahun_ajaran) {
        const count = await this.kelasRepository.count({
            where: {
                jenjang,
                tahun_ajaran,
            },
        });
        return count;
    }
    async findAll(limit, skip, latest) {
        const order = latest ? 'desc' : 'asc';
        const [data, count] = await this.kelasRepository.findAndCount({
            relations: ['tahun_ajaran'],
            select: {
                tahun_ajaran: {
                    tahun_ajaran: true,
                },
            },
            order: {
                created_at: order,
            },
            skip,
            take: limit,
        });
        return { data, count };
    }
    async findAllBySearch(limit, skip, latest, search) {
        const order = latest ? 'desc' : 'asc';
        const [data, count] = await this.kelasRepository.findAndCount({
            where: [
                {
                    kelas: search,
                },
                {
                    kode_kelas: search,
                },
                {
                    jenjang: search,
                },
                {
                    tahun_ajaran: {
                        tahun_ajaran: (0, typeorm_1.Like)(`%${search}%`),
                    },
                },
            ],
            relations: ['tahun_ajaran'],
            select: {
                tahun_ajaran: {
                    tahun_ajaran: true,
                },
            },
            order: {
                created_at: order,
            },
            skip,
            take: limit,
        });
        return { data, count };
    }
    async find(id) {
        const data = await this.kelasRepository.findOne({
            where: { kelas_id: id },
            relations: ['tahun_ajaran'],
            select: {
                tahun_ajaran: {
                    tahun_ajaran: true,
                },
            },
        });
        return data;
    }
};
exports.KelasRepository = KelasRepository;
exports.KelasRepository = KelasRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(kelas_entity_1.Kelas)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], KelasRepository);
//# sourceMappingURL=kelas.repository.js.map