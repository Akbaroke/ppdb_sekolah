"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsecaseModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const role_guard_1 = require("../infrastucture/common/guards/role.guard");
const token_module_1 = require("../domain/token/token.module");
const tahun_ajaran_module_1 = require("./tahun-ajaran/tahun-ajaran.module");
const kelas_module_1 = require("./kelas/kelas.module");
let UsecaseModule = class UsecaseModule {
};
exports.UsecaseModule = UsecaseModule;
exports.UsecaseModule = UsecaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            token_module_1.TokenModule,
            auth_module_1.AuthModule,
            tahun_ajaran_module_1.UsecaseTahunAjaranModule,
            kelas_module_1.UsecaseKelasModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RoleGuard,
            },
        ],
    })
], UsecaseModule);
//# sourceMappingURL=usecase.module.js.map