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
exports.TokenRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const token_entity_1 = require("./token.entity");
const typeorm_2 = require("typeorm");
let TokenRepository = class TokenRepository {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    async findToken(payload) {
        const data = await this.tokenRepository.findOne({
            where: {
                user: payload.user,
            },
        });
        return data;
    }
    async findTokenByAccessToken(accessToken) {
        const data = await this.tokenRepository.findOne({
            where: {
                accessToken,
            },
            relations: { user: true },
            select: { user: { user_id: true, email: true, role: true } },
        });
        return data;
    }
    async saveToken(payload) {
        return await this.tokenRepository.save(payload);
    }
    async updateToken(accessToken, payload) {
        return await this.tokenRepository.update({ accessToken }, payload);
    }
};
exports.TokenRepository = TokenRepository;
exports.TokenRepository = TokenRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(token_entity_1.Token)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TokenRepository);
//# sourceMappingURL=token.repository.js.map