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
exports.KelasController = void 0;
const common_1 = require("@nestjs/common");
const kelas_service_1 = require("./kelas.service");
const roles_decorator_1 = require("../../infrastucture/common/decorators/roles.decorator");
const user_interface_1 = require("../../domain/user/user.interface");
const create_kelas_dto_1 = require("./dtos/create-kelas.dto");
const validationUUID_filter_1 = require("../../infrastucture/common/filters/validationUUID.filter");
const update_kelas_dto_1 = require("./dtos/update-kelas.dto");
let KelasController = class KelasController {
    constructor(kelasService) {
        this.kelasService = kelasService;
    }
    async create_kelas({ jenjang, tahun_ajaran }) {
        return await this.kelasService.createKelas(jenjang, tahun_ajaran);
    }
    async get_all_kelas(limit, page, latest, search) {
        return await this.kelasService.getAllKelas(limit, page, latest, search);
    }
    async get_kelas_by_id(id) {
        return await this.kelasService.getKelas(id);
    }
    async update_kelas(id, { jenjang, tahun_ajaran }) {
        return await this.kelasService.updateKelas(id, jenjang, tahun_ajaran);
    }
    async delete_kelas(id) {
        return await this.kelasService.deleteKelas(id);
    }
};
exports.KelasController = KelasController;
__decorate([
    (0, roles_decorator_1.Roles)(user_interface_1.ROLE_USER.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_kelas_dto_1.CreateKelasDto]),
    __metadata("design:returntype", Promise)
], KelasController.prototype, "create_kelas", null);
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
], KelasController.prototype, "get_all_kelas", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_interface_1.ROLE_USER.ADMIN, user_interface_1.ROLE_USER.USER),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', validationUUID_filter_1.ValidationUUID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KelasController.prototype, "get_kelas_by_id", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_interface_1.ROLE_USER.ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', validationUUID_filter_1.ValidationUUID)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_kelas_dto_1.UpdateKelasDto]),
    __metadata("design:returntype", Promise)
], KelasController.prototype, "update_kelas", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_interface_1.ROLE_USER.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', validationUUID_filter_1.ValidationUUID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KelasController.prototype, "delete_kelas", null);
exports.KelasController = KelasController = __decorate([
    (0, common_1.Controller)('kelas'),
    __metadata("design:paramtypes", [kelas_service_1.UsecaseKelasService])
], KelasController);
//# sourceMappingURL=kelas.controller.js.map