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
exports.ResponseRefreshToken = exports.ResponseResetPassword = exports.ResponsePostOTP = exports.ResponseGetOTP = exports.ResponseLogin = exports.ResponseRegister = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
class ResponseRegister {
}
exports.ResponseRegister = ResponseRegister;
__decorate([
    (0, swagger_1.ApiProperty)({ example: common_1.HttpStatus.CREATED, type: Number }),
    __metadata("design:type", Number)
], ResponseRegister.prototype, "httpStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Verifikasi akun terlebih dahulu', type: String }),
    __metadata("design:type", String)
], ResponseRegister.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@gmail.com', type: String }),
    __metadata("design:type", String)
], ResponseRegister.prototype, "email", void 0);
class ResponseLogin {
}
exports.ResponseLogin = ResponseLogin;
__decorate([
    (0, swagger_1.ApiProperty)({ example: common_1.HttpStatus.OK, type: Number }),
    __metadata("design:type", Number)
], ResponseLogin.prototype, "httpStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Login berhasil', type: String }),
    __metadata("design:type", String)
], ResponseLogin.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'token', type: 'string' }),
    __metadata("design:type", String)
], ResponseLogin.prototype, "token", void 0);
class ResponseGetOTP {
}
exports.ResponseGetOTP = ResponseGetOTP;
__decorate([
    (0, swagger_1.ApiProperty)({ example: common_1.HttpStatus.OK, type: Number }),
    __metadata("design:type", Number)
], ResponseGetOTP.prototype, "httpStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Token berhasil dikirim', type: String }),
    __metadata("design:type", String)
], ResponseGetOTP.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@gmail.com', type: String }),
    __metadata("design:type", String)
], ResponseGetOTP.prototype, "email", void 0);
class ResponsePostOTP {
}
exports.ResponsePostOTP = ResponsePostOTP;
__decorate([
    (0, swagger_1.ApiProperty)({ example: common_1.HttpStatus.OK, type: Number }),
    __metadata("design:type", Number)
], ResponsePostOTP.prototype, "httpStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '', type: String }),
    __metadata("design:type", String)
], ResponsePostOTP.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@gmail.com', type: String }),
    __metadata("design:type", String)
], ResponsePostOTP.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'token', type: String }),
    __metadata("design:type", String)
], ResponsePostOTP.prototype, "token", void 0);
class ResponseResetPassword {
}
exports.ResponseResetPassword = ResponseResetPassword;
__decorate([
    (0, swagger_1.ApiProperty)({ example: common_1.HttpStatus.OK, type: Number }),
    __metadata("design:type", Number)
], ResponseResetPassword.prototype, "httpStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Reset password berhasil', type: String }),
    __metadata("design:type", String)
], ResponseResetPassword.prototype, "message", void 0);
class ResponseRefreshToken {
}
exports.ResponseRefreshToken = ResponseRefreshToken;
__decorate([
    (0, swagger_1.ApiProperty)({ example: common_1.HttpStatus.OK, type: Number }),
    __metadata("design:type", Number)
], ResponseRefreshToken.prototype, "httpStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'RefreshToken berhasil', type: String }),
    __metadata("design:type", String)
], ResponseRefreshToken.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'token', type: String }),
    __metadata("design:type", String)
], ResponseRefreshToken.prototype, "token", void 0);
//# sourceMappingURL=auth.presenter.js.map