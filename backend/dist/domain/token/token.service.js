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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../../infrastucture/authentication/token-management/token.service");
const token_repository_1 = require("./token.repository");
const config_1 = require("@nestjs/config");
let TokenService = class TokenService {
    constructor(jwtService, tokenRepository, configService) {
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.configService = configService;
    }
    async updateToken(accessToken, payload) {
        return await this.tokenRepository.updateToken(accessToken, payload || {});
    }
    async generateAccessTokenAndRefreshToken(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.generateAccessToken(payload),
            this.jwtService.generateRefreshToken(payload, {
                secret: this.configService.getOrThrow('jwt_secret_key'),
                expiresIn: '7d',
            }),
        ]);
        return { accessToken, refreshToken };
    }
    async generateTokenForgotPassword(payload) {
        const token = await this.jwtService.generateTokenForgotPassword(payload, {
            secret: this.configService.getOrThrow('jwt_forgot_password_key'),
            expiresIn: '5m',
        });
        return token;
    }
    async saveToken(payload) {
        return await this.tokenRepository.saveToken(payload);
    }
    async findTokenByUser(payload) {
        const data = await this.tokenRepository.findToken(payload);
        if (!data) {
            return null;
        }
        return data.accessToken;
    }
    async verifyToken(accessToken) {
        const data = await this.jwtService.verifyAccessToken(accessToken);
        return data;
    }
    async checkExpiredAccessToken(accessToken) {
        const isExpired = await this.jwtService
            .verifyAccessToken(accessToken)
            .then(() => false)
            .catch((error) => {
            if (error.message === 'jwt expired') {
                return true;
            }
            throw new common_1.BadRequestException('Token tidak sah');
        });
        return isExpired;
    }
    async findToken(accessToken) {
        const token = await this.tokenRepository.findTokenByAccessToken(accessToken);
        return token;
    }
    async refreshToken(token) {
        const accessToken = await this.jwtService
            .verifyRefreshToken(token.refreshToken, {
            secret: this.configService.getOrThrow('jwt_secret_key'),
        })
            .then(async ({ id, email, role }) => {
            const createAccessToken = await this.jwtService.generateAccessToken({
                id,
                email,
                role,
            });
            await this.updateToken(token.accessToken, {
                accessToken: createAccessToken,
            });
            return createAccessToken;
        })
            .catch(async (error) => {
            if (error.message === 'jwt expired') {
                const payload = {
                    id: token.user.user_id,
                    email: token.user.email,
                    role: token.user.role,
                };
                const generateToken = await this.generateAccessTokenAndRefreshToken(payload);
                await this.updateToken(token.accessToken, {
                    accessToken: generateToken.accessToken,
                    refreshToken: generateToken.refreshToken,
                });
                return generateToken.accessToken;
            }
            throw new common_1.BadRequestException('token tidak sah');
        });
        return accessToken;
    }
    async verifyTokenForgotPassword(token) {
        const payload = await this.jwtService.verifyTokenForgotPassword(token, {
            secret: this.configService.getOrThrow('jwt_forgot_password_key'),
        });
        return payload;
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.JWTService,
        token_repository_1.TokenRepository,
        config_1.ConfigService])
], TokenService);
//# sourceMappingURL=token.service.js.map