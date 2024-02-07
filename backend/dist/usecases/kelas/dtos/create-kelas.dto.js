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
exports.CreateKelasDto = void 0;
const class_validator_1 = require("class-validator");
const kelas_interface_1 = require("../../../domain/kelas/kelas.interface");
const validationTahunAjaran_decorator_1 = require("../../../infrastucture/common/decorators/validationTahunAjaran.decorator");
class CreateKelasDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.CreateKelasDto = CreateKelasDto;
__decorate([
    (0, class_validator_1.IsEnum)(kelas_interface_1.JENJANG, { message: 'jenjang hanya memiliki pg, tka, dan tkb' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'jenjang harus diisi' }),
    __metadata("design:type", String)
], CreateKelasDto.prototype, "jenjang", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'type tahun_ajaran harus string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'tahun_ajaran harus diisi' }),
    (0, validationTahunAjaran_decorator_1.validationTahunAjaran)(),
    __metadata("design:type", String)
], CreateKelasDto.prototype, "tahun_ajaran", void 0);
//# sourceMappingURL=create-kelas.dto.js.map