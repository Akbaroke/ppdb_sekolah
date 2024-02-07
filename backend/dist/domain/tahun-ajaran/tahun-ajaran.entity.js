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
exports.TahunAjaran = void 0;
const typeorm_1 = require("typeorm");
const kelas_entity_1 = require("../kelas/kelas.entity");
let TahunAjaran = class TahunAjaran {
};
exports.TahunAjaran = TahunAjaran;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TahunAjaran.prototype, "tahun_ajaran_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'tahun_ajaran',
        type: 'varchar',
        length: 9,
        nullable: false,
        unique: true,
    }),
    (0, typeorm_1.Index)('i_tahun_ajaran'),
    __metadata("design:type", String)
], TahunAjaran.prototype, "tahun_ajaran", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'besar_spp',
        type: 'bigint',
        nullable: false,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], TahunAjaran.prototype, "besar_spp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'biaya_daftar',
        type: 'bigint',
        nullable: false,
        unsigned: true,
    }),
    __metadata("design:type", Number)
], TahunAjaran.prototype, "biaya_daftar", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => kelas_entity_1.Kelas, (kelas) => kelas.tahun_ajaran),
    __metadata("design:type", kelas_entity_1.Kelas)
], TahunAjaran.prototype, "kelas", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'bigint',
        nullable: false,
        default: Date.now(),
    }),
    __metadata("design:type", Number)
], TahunAjaran.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'bigint',
        nullable: false,
        default: Date.now(),
    }),
    __metadata("design:type", Number)
], TahunAjaran.prototype, "updated_at", void 0);
exports.TahunAjaran = TahunAjaran = __decorate([
    (0, typeorm_1.Entity)()
], TahunAjaran);
//# sourceMappingURL=tahun-ajaran.entity.js.map