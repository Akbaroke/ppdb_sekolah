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
exports.TahunAjaranController = void 0;
const common_1 = require("@nestjs/common");
const create_tahun_ajaran_dto_1 = require("./dtos/create-tahun-ajaran.dto");
const roles_decorator_1 = require("../../infrastucture/common/decorators/roles.decorator");
const user_interface_1 = require("../../domain/user/user.interface");
const validationUUID_filter_1 = require("../../infrastucture/common/filters/validationUUID.filter");
const tahun_ajaran_service_1 = require("./tahun-ajaran.service");
const update_tahun_ajaran_dto_1 = require("./dtos/update-tahun-ajaran.dto");
let TahunAjaranController = class TahunAjaranController {
    constructor(tahunAjaranService) {
        this.tahunAjaranService = tahunAjaranService;
    }
    async create_tahun_ajaran(body) {
        return await this.tahunAjaranService.create(body);
    }
    async update_tahun_ajaran(id, body) {
        return await this.tahunAjaranService.update(id, body);
    }
    async get_all_tahun_ajaran(limit, page, latest, search) {
        return await this.tahunAjaranService.getAll(limit, page, latest, search);
    }
    async get_tahun_ajaran_by_id(id) {
        return await this.tahunAjaranService.getById(id);
    }
};
exports.TahunAjaranController = TahunAjaranController;
__decorate([
    (0, roles_decorator_1.Roles)(user_interface_1.ROLE_USER.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tahun_ajaran_dto_1.CreateTahunAjaranDto]),
    __metadata("design:returntype", Promise)
], TahunAjaranController.prototype, "create_tahun_ajaran", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_interface_1.ROLE_USER.ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', validationUUID_filter_1.ValidationUUID)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tahun_ajaran_dto_1.UpdateTahunAjaranDto]),
    __metadata("design:returntype", Promise)
], TahunAjaranController.prototype, "update_tahun_ajaran", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_interface_1.ROLE_USER.ADMIN, user_interface_1.ROLE_USER.USER),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('latest', new common_1.DefaultValuePipe(false), common_1.ParseBoolPipe)),
    __param(3, (0, common_1.Query)('s', new common_1.DefaultValuePipe(null))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], TahunAjaranController.prototype, "get_all_tahun_ajaran", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_interface_1.ROLE_USER.ADMIN, user_interface_1.ROLE_USER.USER),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', validationUUID_filter_1.ValidationUUID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TahunAjaranController.prototype, "get_tahun_ajaran_by_id", null);
exports.TahunAjaranController = TahunAjaranController = __decorate([
    (0, common_1.Controller)('tahun_ajaran'),
    __metadata("design:paramtypes", [tahun_ajaran_service_1.UsecaseTahunAjaranService])
], TahunAjaranController);
//# sourceMappingURL=tahun-ajaran.controller.js.map