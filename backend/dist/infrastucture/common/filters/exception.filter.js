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
exports.ExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const logger_service_1 = require("../../logger/logger.service");
let ExceptionsFilter = class ExceptionsFilter {
    constructor(httpAdapterHost, logger) {
        this.httpAdapterHost = httpAdapterHost;
        this.logger = logger;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const { message, statusCode } = exception instanceof common_1.HttpException
            ? {
                message: exception.getResponse().message,
                statusCode: exception.getStatus(),
            }
            : { message: exception.message, statusCode: 500 };
        const path = httpAdapter.getRequestUrl(request);
        const method = httpAdapter.getRequestMethod(request);
        const status = common_1.HttpStatus[statusCode];
        const responseBody = {
            path,
            method,
            status,
            ...(Array.isArray(message)
                ? { message: message[0], statusCode }
                : { message, statusCode }),
        };
        this.logMessage(path, method, status, statusCode, message);
        httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
    }
    logMessage(path, method, status, statusCode, message) {
        if (statusCode === 500) {
            this.logger.error(`End Request for ${path}`, `method=${method} status=${status} statusCode=${statusCode} message=${message}`);
        }
        else {
            this.logger.warn(`End Request for ${path}`, `method=${method} status=${status} statusCode=${statusCode} message=${message}`);
        }
    }
};
exports.ExceptionsFilter = ExceptionsFilter;
exports.ExceptionsFilter = ExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost,
        logger_service_1.LoggerService])
], ExceptionsFilter);
//# sourceMappingURL=exception.filter.js.map