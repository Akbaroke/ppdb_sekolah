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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const user_interface_1 = require("./user.interface");
const token_entity_1 = require("../token/token.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "user_id", void 0);
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
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: user_interface_1.STATUS_USER, default: user_interface_1.STATUS_USER.PENDING, type: 'enum' }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: user_interface_1.ROLE_USER, default: user_interface_1.ROLE_USER.USER, type: 'enum' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => token_entity_1.Token, (token) => token.user),
    __metadata("design:type", token_entity_1.Token)
], User.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'bigint',
        nullable: false,
        default: Date.now(),
    }),
    __metadata("design:type", Number)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'bigint',
        nullable: false,
        default: Date.now(),
    }),
    __metadata("design:type", Number)
], User.prototype, "updated_at", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map