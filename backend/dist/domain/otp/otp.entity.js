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
exports.Otp = void 0;
const typeorm_1 = require("typeorm");
const otp_interface_1 = require("./otp.interface");
let Otp = class Otp {
};
exports.Otp = Otp;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Otp.prototype, "otp_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'email',
        type: 'varchar',
        unique: true,
        length: 317,
        nullable: false,
    }),
    (0, typeorm_1.Index)('i_email'),
    __metadata("design:type", String)
], Otp.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'otp', type: 'varchar', length: 5, nullable: false }),
    __metadata("design:type", String)
], Otp.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type_otp', type: 'enum', enum: otp_interface_1.TYPE_OTP, nullable: false }),
    __metadata("design:type", String)
], Otp.prototype, "type_otp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'used', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Otp.prototype, "used", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'bigint',
        nullable: false,
        default: Date.now(),
    }),
    __metadata("design:type", Number)
], Otp.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'bigint',
        nullable: false,
        default: new Date().setTime(Date.now() + 3 * 60 * 1000),
    }),
    __metadata("design:type", Number)
], Otp.prototype, "expires_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'bigint',
        nullable: false,
        default: Date.now(),
    }),
    __metadata("design:type", Number)
], Otp.prototype, "updated_at", void 0);
exports.Otp = Otp = __decorate([
    (0, typeorm_1.Entity)()
], Otp);
//# sourceMappingURL=otp.entity.js.map