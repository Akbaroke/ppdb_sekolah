"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsecaseTahunAjaranModule = void 0;
const common_1 = require("@nestjs/common");
const tahun_ajaran_module_1 = require("../../domain/tahun-ajaran/tahun-ajaran.module");
const tahun_ajaran_controller_1 = require("./tahun-ajaran.controller");
const tahun_ajaran_service_1 = require("./tahun-ajaran.service");
const pagination_service_1 = require("../services/pagination.service");
let UsecaseTahunAjaranModule = class UsecaseTahunAjaranModule {
};
exports.UsecaseTahunAjaranModule = UsecaseTahunAjaranModule;
exports.UsecaseTahunAjaranModule = UsecaseTahunAjaranModule = __decorate([
    (0, common_1.Module)({
        imports: [tahun_ajaran_module_1.TahunAjaranModule],
        providers: [tahun_ajaran_service_1.UsecaseTahunAjaranService, pagination_service_1.PaginationService],
        controllers: [tahun_ajaran_controller_1.TahunAjaranController],
    })
], UsecaseTahunAjaranModule);
//# sourceMappingURL=tahun-ajaran.module.js.map