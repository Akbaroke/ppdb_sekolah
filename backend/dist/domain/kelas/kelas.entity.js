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
exports.Kelas = void 0;
const typeorm_1 = require("typeorm");
const kelas_interface_1 = require("./kelas.interface");
const tahun_ajaran_entity_1 = require("../tahun-ajaran/tahun-ajaran.entity");
let Kelas = class Kelas {
};
exports.Kelas = Kelas;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Kelas.prototype, "kelas_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'kelas',
        type: 'varchar',
        length: 10,
        nullable: false,
    }),
    __metadata("design:type", String)
], Kelas.prototype, "kelas", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'jenjang', type: 'enum', enum: kelas_interface_1.JENJANG, nullable: false }),
    __metadata("design:type", String)
], Kelas.prototype, "jenjang", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'kode_kelas',
        type: 'varchar',
        length: 10,
        nullable: false,
    }),
    __metadata("design:type", String)
], Kelas.prototype, "kode_kelas", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'jumlah_siswa',
        type: 'smallint',
        unsigned: true,
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Kelas.prototype, "jumlah_siswa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tahun_ajaran_entity_1.TahunAjaran, (tahun_ajaran) => tahun_ajaran.kelas, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tahun_ajaran' }),
    __metadata("design:type", tahun_ajaran_entity_1.TahunAjaran)
], Kelas.prototype, "tahun_ajaran", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'bigint',
        nullable: false,
        default: Date.now(),
    }),
    __metadata("design:type", Number)
], Kelas.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'bigint',
        nullable: false,
        default: Date.now(),
    }),
    __metadata("design:type", Number)
], Kelas.prototype, "updated_at", void 0);
exports.Kelas = Kelas = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)('u_kelas_and_kode_kelas', ['kelas', 'kode_kelas', 'tahun_ajaran'])
], Kelas);
//# sourceMappingURL=kelas.entity.js.map