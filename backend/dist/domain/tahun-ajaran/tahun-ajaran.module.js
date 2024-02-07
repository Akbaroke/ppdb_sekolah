"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TahunAjaranModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tahun_ajaran_entity_1 = require("./tahun-ajaran.entity");
const tahun_ajaran_repository_1 = require("./tahun-ajaran.repository");
const tahun_ajaran_service_1 = require("./tahun-ajaran.service");
const kelas_entity_1 = require("../kelas/kelas.entity");
const tahun_ajaran_subscriber_1 = require("./tahun-ajaran.subscriber");
let TahunAjaranModule = class TahunAjaranModule {
};
exports.TahunAjaranModule = TahunAjaranModule;
exports.TahunAjaranModule = TahunAjaranModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tahun_ajaran_entity_1.TahunAjaran, kelas_entity_1.Kelas])],
        providers: [tahun_ajaran_repository_1.TahunAjaranRepository, tahun_ajaran_service_1.TahunAjaranService, tahun_ajaran_subscriber_1.TahunAjaranSubscriber],
        exports: [tahun_ajaran_service_1.TahunAjaranService],
    })
], TahunAjaranModule);
//# sourceMappingURL=tahun-ajaran.module.js.map