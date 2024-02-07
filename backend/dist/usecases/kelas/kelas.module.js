"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsecaseKelasModule = void 0;
const common_1 = require("@nestjs/common");
const kelas_module_1 = require("../../domain/kelas/kelas.module");
const kelas_controller_1 = require("./kelas.controller");
const kelas_service_1 = require("./kelas.service");
const tahun_ajaran_module_1 = require("../../domain/tahun-ajaran/tahun-ajaran.module");
const pagination_service_1 = require("../services/pagination.service");
let UsecaseKelasModule = class UsecaseKelasModule {
};
exports.UsecaseKelasModule = UsecaseKelasModule;
exports.UsecaseKelasModule = UsecaseKelasModule = __decorate([
    (0, common_1.Module)({
        imports: [kelas_module_1.KelasModule, tahun_ajaran_module_1.TahunAjaranModule],
        controllers: [kelas_controller_1.KelasController],
        providers: [kelas_service_1.UsecaseKelasService, pagination_service_1.PaginationService],
    })
], UsecaseKelasModule);
//# sourceMappingURL=kelas.module.js.map