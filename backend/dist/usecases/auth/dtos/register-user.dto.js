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
exports.RegisterDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class RegisterDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: 'admin@gmail.com', type: String }),
    (0, class_validator_1.IsEmail)({}, { message: 'email tidak sah' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Password harus memiliki angka',
        minLength: 12,
        example: 'AdminAja123_',
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'password harus di isi' }),
    (0, class_validator_1.IsString)({ message: 'Type password harus string' }),
    (0, class_validator_1.MinLength)(8, { message: 'password minimal 8 characters' }),
    (0, class_validator_1.IsStrongPassword)({
        minNumbers: 1,
        minSymbols: 0,
        minLowercase: 0,
        minUppercase: 0,
    }, {
        message: 'password harus memiliki angka',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
//# sourceMappingURL=register-user.dto.js.map