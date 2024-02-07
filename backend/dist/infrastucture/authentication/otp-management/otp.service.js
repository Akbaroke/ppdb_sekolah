"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpGenerator = void 0;
const common_1 = require("@nestjs/common");
const otp_generator_1 = require("otp-generator");
let OtpGenerator = class OtpGenerator {
    createOtp(length) {
        const otp = (0, otp_generator_1.generate)(length, {
            lowerCaseAlphabets: false,
            specialChars: false,
            upperCaseAlphabets: false,
            digits: true,
        });
        return otp;
    }
};
exports.OtpGenerator = OtpGenerator;
exports.OtpGenerator = OtpGenerator = __decorate([
    (0, common_1.Injectable)()
], OtpGenerator);
//# sourceMappingURL=otp.service.js.map