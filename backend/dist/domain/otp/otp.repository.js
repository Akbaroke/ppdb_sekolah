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
exports.OtpRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const otp_entity_1 = require("./otp.entity");
let OtpRepository = class OtpRepository {
    constructor(otpRepository) {
        this.otpRepository = otpRepository;
    }
    async exists(email, type_otp, otp) {
        const now = new Date().getTime();
        const data = await this.otpRepository.exists({
            where: {
                email,
                otp,
                type_otp,
                expires_at: (0, typeorm_2.MoreThanOrEqual)(now),
                used: false,
            },
        });
        return data;
    }
    async findOtpByEmail(email) {
        const data = await this.otpRepository.findOne({ where: { email } });
        return data;
    }
};
exports.OtpRepository = OtpRepository;
exports.OtpRepository = OtpRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(otp_entity_1.Otp)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OtpRepository);
//# sourceMappingURL=otp.repository.js.map