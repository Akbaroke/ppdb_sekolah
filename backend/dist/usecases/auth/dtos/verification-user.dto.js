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
exports.VerificationUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const otp_interface_1 = require("../../../domain/otp/otp.interface");
class VerificationUserDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.VerificationUserDto = VerificationUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: 'admin@gmail.com', type: String }),
    (0, class_validator_1.IsEmail)({}, { message: 'email tidak sah' }),
    __metadata("design:type", String)
], VerificationUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Otp maksimal 5 angka',
        minLength: 5,
        example: '12345',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'otp harus di isi' }),
    (0, class_validator_1.IsString)({ message: 'Type otp harus string' }),
    (0, class_validator_1.MinLength)(5, { message: 'otp minimal 5 angka' }),
    (0, class_validator_1.MaxLength)(5, { message: 'otp maksimal 5 angka' }),
    __metadata("design:type", String)
], VerificationUserDto.prototype, "otp", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'type_otp harus di isi' }),
    (0, class_validator_1.IsString)({ message: 'Type type_otp harus string' }),
    (0, class_validator_1.IsEnum)(otp_interface_1.TYPE_OTP),
    __metadata("design:type", String)
], VerificationUserDto.prototype, "type_otp", void 0);
//# sourceMappingURL=verification-user.dto.js.map