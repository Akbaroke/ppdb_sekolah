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
exports.NodemailerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let NodemailerService = class NodemailerService {
    constructor(configService) {
        this.configService = configService;
    }
    transporter() {
        try {
            return nodemailer.createTransport({
                host: 'smtp.gmail.com',
                auth: {
                    user: this.configService.getOrThrow('smtp_user'),
                    pass: this.configService.getOrThrow('smtp_password'),
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async sendEmail(to, subject, body) {
        try {
            await this.transporter().sendMail({
                from: this.configService.getOrThrow('smtp_user'),
                to,
                subject,
                html: body,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async sendVerificationEmail(to, otp) {
        try {
            const body = `<h1 style="text-align: center;">${otp}</h1>`;
            const subject = 'verifikasi akun';
            await this.sendEmail(to, subject, body);
        }
        catch (error) {
            throw error;
        }
    }
    async sendForgotPassword(to, otp) {
        try {
            const body = `<h1 style="text-align: center;">${otp}</h1>`;
            const subject = 'Lupa Password';
            await this.sendEmail(to, subject, body);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.NodemailerService = NodemailerService;
exports.NodemailerService = NodemailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NodemailerService);
//# sourceMappingURL=nodemailer.service.js.map