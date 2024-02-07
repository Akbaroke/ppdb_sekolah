"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const logger_module_1 = require("../logger/logger.module");
const exception_filter_1 = require("./filters/exception.filter");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        imports: [logger_module_1.LoggerModule],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: exception_filter_1.ExceptionsFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.ClassSerializerInterceptor,
            },
        ],
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map