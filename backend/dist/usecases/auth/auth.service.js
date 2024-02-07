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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../domain/user/user.service");
const hashing_service_1 = require("../../infrastucture/hashing/hashing.service");
const typeorm_1 = require("typeorm");
const nodemailer_service_1 = require("../../infrastucture/email/nodemailer.service");
const otp_service_1 = require("../../domain/otp/otp.service");
const token_service_1 = require("../../domain/token/token.service");
const otp_interface_1 = require("../../domain/otp/otp.interface");
const blacklist_service_1 = require("./blacklist.service");
let AuthService = class AuthService {
    constructor(entityManager, userService, emailService, hashingService, otpService, tokenService, blackListTokenService) {
        this.entityManager = entityManager;
        this.userService = userService;
        this.emailService = emailService;
        this.hashingService = hashingService;
        this.otpService = otpService;
        this.tokenService = tokenService;
        this.blackListTokenService = blackListTokenService;
    }
    async register(email, password) {
        try {
            const existingUser = await this.findUserByEmail(email);
            if (existingUser) {
                throw new common_1.ConflictException('Email sudah terdaftar');
            }
            const hashPassword = await this.hashingPassword(password);
            await this.transactionRegister(email, hashPassword);
            return {
                email,
                message: 'Verifikasi akun terlebih dahulu',
                httpStatus: common_1.HttpStatus.CREATED,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async verificationOTP(email, otp, type_otp) {
        let token;
        try {
            const isValidOtp = await this.validateOtp(email, otp, type_otp);
            if (!isValidOtp) {
                throw new common_1.UnauthorizedException('Otp tidak sah');
            }
            const user = await this.findUserByEmail(email);
            await this.entityManager.transaction(async (entityManager) => {
                if (type_otp === otp_interface_1.TYPE_OTP.REGISTER) {
                    await Promise.all([
                        this.consumeOtpAndTransaction(email, entityManager),
                        this.verifyUserAndTransaction(user, entityManager),
                    ]);
                }
                else {
                    await this.consumeOtpAndTransaction(email, entityManager);
                    token = await this.tokenService.generateTokenForgotPassword({
                        id: user.user_id,
                        email,
                    });
                }
            });
            const message = {
                email,
                httpStatus: common_1.HttpStatus.OK,
                message: 'Selamat akun berhasil di verifikasi',
            };
            if (token) {
                Object.assign(message, { token, message: 'Silahkan ganti password' });
            }
            return message;
        }
        catch (error) {
            throw error;
        }
    }
    async login(email, password) {
        let token;
        try {
            const user = await this.findUserByEmail(email);
            if (!user) {
                throw new common_1.NotFoundException('Akun tidak ditemukan');
            }
            await this.checkPassword(password, user.password);
            if (user.status !== 'active') {
                throw new common_1.ForbiddenException('Tolong verifikasi akun terlebih dahulu');
            }
            token = await this.tokenService.findTokenByUser({ user });
            if (!token) {
                const payload = {
                    id: user.user_id,
                    email: email,
                    role: user.role,
                };
                const { accessToken, refreshToken } = await this.tokenService.generateAccessTokenAndRefreshToken(payload);
                await this.tokenService.saveToken({ accessToken, refreshToken, user });
                token = accessToken;
            }
            return {
                httpStatus: common_1.HttpStatus.OK,
                message: 'Berhasil masuk',
                role: user.role,
                email,
                token,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async refreshOtpOnRequest(email, type_otp) {
        const now = new Date().getTime() + 60000;
        try {
            const user = await this.findUserByEmail(email);
            if (!user ||
                (user && user.status === 'active' && type_otp === 'register')) {
                throw new common_1.NotFoundException('User tidak ditemukan');
            }
            const hasOTP = await this.doesUserHaveOTP(email);
            if (hasOTP && hasOTP.expires_at - now >= 60000) {
                throw new common_1.BadRequestException('Tunggu 1 menit');
            }
            await this.entityManager.transaction(async (entityManager) => {
                const otp = this.otpService.generateOtp();
                if (user.status === 'active' && type_otp === 'forgot') {
                    await this.transactionRefreshOtpOnRequest(hasOTP, email, otp, type_otp, entityManager);
                    return this.emailService.sendForgotPassword(email, otp);
                }
                if (user.status !== 'active' && type_otp === 'register') {
                    await this.transactionRefreshOtpOnRequest(hasOTP, email, otp, type_otp, entityManager);
                    return this.emailService.sendVerificationEmail(email, otp);
                }
                throw new common_1.BadRequestException('Gagal kirim otp');
            });
            const message = {
                message: 'Otp berhasil dikirim',
                httpStatus: common_1.HttpStatus.OK,
            };
            if (type_otp === 'forgot') {
                Object.assign(message, { email });
            }
            return message;
        }
        catch (error) {
            throw error;
        }
    }
    async refreshToken(accessToken) {
        try {
            await this.validateAccessTokenExpiration(accessToken);
            const existingToken = await this.tokenService.findToken(accessToken);
            if (!existingToken) {
                throw new common_1.UnauthorizedException('token illegal');
            }
            const token = await this.tokenService.refreshToken(existingToken);
            return {
                httpStatus: common_1.HttpStatus.OK,
                message: 'RefreshToken berhasil',
                token,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async resetPassword(token, email, new_password) {
        try {
            const user = await this.userService.existsByEmail(email);
            if (!user) {
                throw new common_1.NotFoundException('User tidak ditemukan');
            }
            const payload = await this.tokenService.verifyTokenForgotPassword(token);
            if (payload.email !== email) {
                throw new common_1.UnauthorizedException('Token tidak sah');
            }
            const isTokenBlacklisted = this.blackListTokenService.isTokenBlacklisted(token);
            if (isTokenBlacklisted) {
                throw new common_1.ForbiddenException('Token sudah diblacklist');
            }
            const password = await this.hashingPassword(new_password);
            await this.userService.updateUser(email, { password });
            this.blackListTokenService.addTokenToBlacklist(token);
            return {
                httpStatus: common_1.HttpStatus.OK,
                message: 'Reset password berhasil',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async me(token) {
        try {
            const { id, email, role } = await this.tokenService.verifyToken(token);
            return {
                id,
                email,
                role,
                message: 'Berhasil masuk',
                httpStatus: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            if (error.message === 'jwt expired') {
                throw new common_1.UnauthorizedException('Token sudah kadaluarsa');
            }
            throw error;
        }
    }
    async transactionRegister(email, hashPassword) {
        try {
            return this.entityManager.transaction(async (entityManager) => {
                const generatedOtp = this.otpService.generateOtp();
                const createOtp = this.otpService.createTransactionOtp(email, generatedOtp, otp_interface_1.TYPE_OTP.REGISTER);
                const createUser = this.userService.createTransactionUser(email, hashPassword);
                await Promise.all([
                    this.otpService.saveTransactionOtp(createOtp, entityManager),
                    this.userService.saveTransactionUser(createUser, entityManager),
                ]);
                await this.emailService.sendVerificationEmail(email, createOtp.otp);
            });
        }
        catch (error) {
            throw error;
        }
    }
    async hashingPassword(password) {
        return await this.hashingService.encrypt(password);
    }
    async validateOtp(email, otp, type_otp) {
        return await this.otpService.checkOtp(email, type_otp, otp);
    }
    async doesUserHaveOTP(email) {
        return await this.otpService.findOtpByEmail(email);
    }
    async consumeOtpAndTransaction(email, entityManager) {
        await this.otpService.consumeOtp(email, entityManager);
    }
    async verifyUserAndTransaction(user, entityManager) {
        await this.userService.verificationUser(user, entityManager);
    }
    async checkPassword(password, hashPassord) {
        const IsPAsswordCorrect = await this.hashingService.decrypt(password, hashPassord);
        if (!IsPAsswordCorrect) {
            throw new common_1.UnauthorizedException('Password salah');
        }
    }
    async findUserByEmail(email) {
        return await this.userService.findOneByEmail(email);
    }
    async transactionRefreshOtpOnRequest(hasOTP, email, otp, type_otp, entityManager) {
        try {
            if (!hasOTP) {
                const createOtp = this.otpService.createTransactionOtp(email, otp, type_otp);
                await this.otpService.saveTransactionOtp(createOtp, entityManager);
            }
            else {
                await this.otpService.updateOtpOnRequest(email, otp, type_otp, entityManager);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async validateAccessTokenExpiration(accessToken) {
        const isExpired = await this.tokenService.checkExpiredAccessToken(accessToken);
        if (!isExpired) {
            throw new common_1.ForbiddenException('Token belum kadaluarsa');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.EntityManager,
        user_service_1.UserService,
        nodemailer_service_1.NodemailerService,
        hashing_service_1.HashingService,
        otp_service_1.OtpService,
        token_service_1.TokenService,
        blacklist_service_1.BlacklistService])
], AuthService);
//# sourceMappingURL=auth.service.js.map