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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const register_user_dto_1 = require("./dtos/register-user.dto");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const auth_presenter_1 = require("./auth.presenter");
const login_user_dto_1 = require("./dtos/login-user.dto");
const verification_user_dto_1 = require("./dtos/verification-user.dto");
const otp_interface_1 = require("../../domain/otp/otp.interface");
const reset_password_dto_1 = require("./dtos/reset-password.dto");
const refresh_token_dto_1 = require("./dtos/refresh-token.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register_user({ email, password }) {
        return await this.authService.register(email, password);
    }
    async login({ email, password }) {
        return await this.authService.login(email, password);
    }
    async get_otp(email, type_otp) {
        return await this.authService.refreshOtpOnRequest(email, type_otp);
    }
    async verifikasi_user({ email, otp, type_otp }) {
        return await this.authService.verificationOTP(email, otp, type_otp);
    }
    async me({ token }) {
        return await this.authService.me(token);
    }
    async reset_password_user({ email, new_password, token }) {
        return await this.authService.resetPassword(token, email, new_password);
    }
    async refresh_token({ accessToken }) {
        return await this.authService.refreshToken(accessToken);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiBody)({ type: register_user_dto_1.RegisterDto }),
    (0, swagger_1.ApiOperation)({ description: 'POST - api/register' }),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Registrasi berhasil',
        type: auth_presenter_1.ResponseRegister,
    }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register_user", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: login_user_dto_1.LoginDto }),
    (0, swagger_1.ApiOperation)({ description: 'POST - api/login' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Login berhasil',
        type: auth_presenter_1.ResponseLogin,
    }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'GET - api/otp' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'untuk type forgot akan ada tambahan property email, sedangkan type register tidak ada property email',
        type: auth_presenter_1.ResponseGetOTP,
    }),
    (0, swagger_1.ApiQuery)({ name: 'email', description: 'User email' }),
    (0, swagger_1.ApiQuery)({
        name: 'type_otp',
        description: 'Type OTP (forgot atau register)',
        enum: otp_interface_1.TYPE_OTP,
    }),
    (0, common_1.Get)('otp'),
    __param(0, (0, common_1.Query)('email')),
    __param(1, (0, common_1.Query)('type_otp', new common_1.ParseEnumPipe(otp_interface_1.TYPE_OTP, {
        errorHttpStatusCode: common_1.HttpStatus.BAD_REQUEST,
        exceptionFactory: () => new common_1.BadRequestException('Type otp hanya ada forgot dan register'),
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "get_otp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'POST - api/otp' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'untuk type forgot akan ada tambahan propery token, sedangkan type register tidak ada property token',
        type: auth_presenter_1.ResponsePostOTP,
    }),
    (0, common_1.Post)('otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verification_user_dto_1.VerificationUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifikasi_user", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'POST - api/me' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'cek aja di responsenya di api spek',
        type: Object,
    }),
    (0, common_1.Post)('me'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.MeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'PATCH - api/reset_password' }),
    (0, swagger_1.ApiResponse)({
        description: 'Berhasil ganti password',
        type: auth_presenter_1.ResponseResetPassword,
        status: common_1.HttpStatus.OK,
    }),
    (0, common_1.Patch)('reset_password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "reset_password_user", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'POST - api/refresh_token' }),
    (0, swagger_1.ApiResponse)({
        description: 'RefreshToken berhasil',
        type: auth_presenter_1.ResponseRefreshToken,
        status: common_1.HttpStatus.OK,
    }),
    (0, common_1.Post)('refresh_token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh_token", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map