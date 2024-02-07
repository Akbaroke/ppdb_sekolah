"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_environment_module_1 = require("./environment/config-environment.module");
const config_typeorm_module_1 = require("./typeorm/config-typeorm.module");
let ConfigModule = class ConfigModule {
};
exports.ConfigModule = ConfigModule;
exports.ConfigModule = ConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_environment_module_1.ConfigEnvironmentModule.register(process.env.NODE_ENV),
            config_typeorm_module_1.ConfigTypeormModule,
        ],
        exports: [config_environment_module_1.ConfigEnvironmentModule, config_typeorm_module_1.ConfigTypeormModule],
    })
], ConfigModule);
//# sourceMappingURL=config.module.js.map