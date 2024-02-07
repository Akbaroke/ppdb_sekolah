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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const otp_repository_1 = require("./otp.repository");
const typeorm_1 = require("typeorm");
const otp_entity_1 = require("./otp.entity");
const otp_service_1 = require("../../infrastucture/authentication/otp-management/otp.service");
let OtpService = class OtpService {
    constructor(otpRepository, entityManager, otpGenerator) {
        this.otpRepository = otpRepository;
        this.entityManager = entityManager;
        this.otpGenerator = otpGenerator;
    }
    generateOtp() {
        return this.otpGenerator.createOtp(5);
    }
    createTransactionOtp(email, otp, type_otp) {
        const expires_at = new Date().getTime() + 180000;
        return this.entityManager.create(otp_entity_1.Otp, {
            email,
            otp,
            type_otp,
            expires_at,
        });
    }
    async checkOtp(email, type_otp, otp) {
        const valid = await this.otpRepository.exists(email, type_otp, otp);
        return valid;
    }
    async findOtpByEmail(email) {
        return await this.otpRepository.findOtpByEmail(email);
    }
    async saveTransactionOtp(otp, entityManager = this.entityManager) {
        return await entityManager.save(otp);
    }
    async consumeOtp(email, entityManager = this.entityManager) {
        const now = new Date().getTime();
        const payload = {
            updated_at: now,
            expires_at: now,
            used: true,
        };
        const data = await this.updateTransactionOtp(email, payload, entityManager);
        return data;
    }
    async updateOtpOnRequest(email, otp, type_otp, entityManager = this.entityManager) {
        const now = new Date().getTime();
        const updated_at = now;
        const expires_at = now + 180000;
        const payload = {
            updated_at,
            expires_at,
            otp,
            type_otp,
            used: false,
        };
        const data = await this.updateTransactionOtp(email, payload, entityManager);
        return data;
    }
    async updateTransactionOtp(email, payload, entityManager = this.entityManager) {
        return await entityManager.update(otp_entity_1.Otp, { email }, payload);
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [otp_repository_1.OtpRepository,
        typeorm_1.EntityManager,
        otp_service_1.OtpGenerator])
], OtpService);
//# sourceMappingURL=otp.service.js.map