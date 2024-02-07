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
exports.JWTService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JWTService = class JWTService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async generateToken(payload, options) {
        const token = await this.jwtService.signAsync(payload, options || {});
        return token;
    }
    async verifyToken(token, options) {
        return await this.jwtService
            .verifyAsync(token, options || {})
            .catch((error) => {
            if (error.message === 'invalid signature') {
                throw new common_1.UnauthorizedException('Token tidak sah');
            }
            throw error;
        });
    }
    async generateTokenForgotPassword(payload, options) {
        return await this.generateToken(payload, options || {});
    }
    async generateAccessToken(payload) {
        return await this.generateToken(payload);
    }
    async generateRefreshToken(payload, options) {
        return await this.generateToken(payload, options || {});
    }
    async verifyAccessToken(accessToken) {
        return await this.verifyToken(accessToken);
    }
    async verifyRefreshToken(refreshToken, options) {
        return await this.verifyToken(refreshToken, options || {});
    }
    async verifyTokenForgotPassword(token, options) {
        const payload = await this.verifyToken(token, options || {});
        return payload;
    }
};
exports.JWTService = JWTService;
exports.JWTService = JWTService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JWTService);
//# sourceMappingURL=token.service.js.map