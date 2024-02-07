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
exports.ResetPasswordDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ResetPasswordDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: 'token', type: 'string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'token harus diisi' }),
    (0, class_validator_1.IsString)({ message: 'type token harus string' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: 'admin@gmail.com', type: String }),
    (0, class_validator_1.IsEmail)({}, { message: 'email tidak sah' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Password harus memiliki angka',
        minLength: 12,
        example: 'AdminAja123_',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'new_password harus di isi' }),
    (0, class_validator_1.IsString)({ message: 'Type new_password harus string' }),
    (0, class_validator_1.MinLength)(8, { message: 'new_password minimal 8 characters' }),
    (0, class_validator_1.IsStrongPassword)({
        minNumbers: 1,
        minSymbols: 0,
        minLowercase: 0,
        minUppercase: 0,
    }, {
        message: 'new_password harus memiliki angka',
    }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "new_password", void 0);
//# sourceMappingURL=reset-password.dto.js.map