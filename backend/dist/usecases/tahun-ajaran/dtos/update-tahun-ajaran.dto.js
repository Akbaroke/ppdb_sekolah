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
exports.UpdateTahunAjaranDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateTahunAjaranDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.UpdateTahunAjaranDto = UpdateTahunAjaranDto;
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'type biaya_daftar harus number' }),
    (0, class_validator_1.Min)(0, { message: 'biaya_daftar minimal 0' }),
    __metadata("design:type", Number)
], UpdateTahunAjaranDto.prototype, "biaya_daftar", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'type besar_spp harus number' }),
    (0, class_validator_1.Min)(0, { message: 'besar_spp minimal 0' }),
    __metadata("design:type", Number)
], UpdateTahunAjaranDto.prototype, "besar_spp", void 0);
//# sourceMappingURL=update-tahun-ajaran.dto.js.map