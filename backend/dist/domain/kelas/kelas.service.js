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
exports.KelasService = void 0;
const common_1 = require("@nestjs/common");
const kelas_repository_1 = require("./kelas.repository");
const typeorm_1 = require("typeorm");
const kelas_entity_1 = require("./kelas.entity");
let KelasService = class KelasService {
    constructor(kelasRepository, entityManager) {
        this.kelasRepository = kelasRepository;
        this.entityManager = entityManager;
    }
    createTransactionKelas(data) {
        return this.entityManager.create(kelas_entity_1.Kelas, {
            ...data,
        });
    }
    async saveTransactionKelas(kelas, entityManager = this.entityManager) {
        return await entityManager.save(kelas);
    }
    async updateTransactionKelas(kelas, payload, entityManager = this.entityManager) {
        return entityManager.update(kelas_entity_1.Kelas, { kelas_id: kelas.kelas_id }, payload || {});
    }
    async findLastKelas(jenjang, tahun_ajaran, entityManager) {
        const data = await entityManager.findOne(kelas_entity_1.Kelas, {
            where: {
                jenjang,
                tahun_ajaran,
            },
            order: { kode_kelas: 'DESC' },
            lock: { mode: 'pessimistic_write' },
        });
        return data;
    }
    async findAllWithoutSearch(limit_item, start, latest) {
        try {
            const { data, count } = await this.kelasRepository.findAll(limit_item, start, latest);
            return { limit_item, start, data, count };
        }
        catch (error) {
            throw error;
        }
    }
    async findAllWithSearch(limit_item, start, latest, search) {
        try {
            const { data, count } = await this.kelasRepository.findAllBySearch(limit_item, start, latest, search);
            return { limit_item, start, data, count };
        }
        catch (error) {
            throw error;
        }
    }
    async createKelas({ jenjang, tahun_ajaran, }) {
        let no = 0;
        try {
            await this.entityManager.transaction(async (entityManager) => {
                const countKelas = await this.kelasRepository.countKelas(jenjang, tahun_ajaran);
                if (countKelas === 0) {
                    no = 1;
                }
                if (countKelas > 0) {
                    const findLastKelas = await this.findLastKelas(jenjang, tahun_ajaran, entityManager);
                    if (findLastKelas.jumlah_siswa > 0) {
                        no = countKelas + 1;
                    }
                    else {
                        throw new common_1.BadRequestException('Tidak bisa membuat kelas');
                    }
                }
                const kode_kelas = `${jenjang}-${no}`;
                const kelas = `kelas-${no}`;
                const jumlah_siswa = 0;
                const createKelas = this.createTransactionKelas({
                    jenjang,
                    jumlah_siswa,
                    kelas,
                    kode_kelas,
                    tahun_ajaran,
                });
                await this.saveTransactionKelas(createKelas, entityManager);
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getAllKelas(limit, page, latest, search = null) {
        try {
            const limit_item = limit > 20 ? 20 : limit;
            const start = (page - 1) * limit_item;
            if (search === null || !search) {
                return await this.findAllWithoutSearch(limit_item, start, latest);
            }
            else {
                return await this.findAllWithSearch(limit_item, start, latest, search);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getKelasById(kelas_id) {
        try {
            const data = await this.kelasRepository.find(kelas_id);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async updateKelas(kelas_id, jenjang, tahun_ajaran) {
        let no = 0;
        try {
            const data = await this.entityManager.transaction(async (entityManager) => {
                const findKelas = await this.kelasRepository.find(kelas_id);
                if (!findKelas) {
                    throw new common_1.NotFoundException('Kelas tidak ditemukan');
                }
                if (findKelas && findKelas.jumlah_siswa > 0) {
                    throw new common_1.BadRequestException('Tidak dapat diupdate');
                }
                const findLastKelas = await this.findLastKelas(jenjang, tahun_ajaran, entityManager);
                if (findLastKelas) {
                    if (findLastKelas.jumlah_siswa > 0) {
                        no = Number(findLastKelas.kode_kelas.split('-')[1]) + 1;
                    }
                    else {
                        throw new common_1.BadRequestException('Tidak dapat diupdate');
                    }
                }
                else {
                    no = 1;
                }
                const kode_kelas = `${jenjang}-${no}`;
                const kelas = `kelas-${no}`;
                const payload = {
                    jenjang,
                    tahun_ajaran,
                    kode_kelas,
                    kelas,
                };
                return await this.updateTransactionKelas(findKelas, payload, entityManager);
            });
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteKelas(kelas_id) {
        try {
            const findKelas = await this.kelasRepository.find(kelas_id);
            if (!findKelas) {
                throw new common_1.NotFoundException('Kelas tidak ditemukan');
            }
            if (findKelas && findKelas.jumlah_siswa > 0) {
                throw new common_1.BadRequestException('Tidak dapat diupdate');
            }
            await this.entityManager.delete(kelas_entity_1.Kelas, { kelas_id });
        }
        catch (error) {
            throw error;
        }
    }
};
exports.KelasService = KelasService;
exports.KelasService = KelasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kelas_repository_1.KelasRepository,
        typeorm_1.EntityManager])
], KelasService);
//# sourceMappingURL=kelas.service.js.map