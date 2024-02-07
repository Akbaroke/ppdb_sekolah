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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
const user_interface_1 = require("./user.interface");
let UserService = class UserService {
    constructor(userRepository, entityManager) {
        this.userRepository = userRepository;
        this.entityManager = entityManager;
    }
    createTransactionUser(email, password) {
        return this.entityManager.create(user_entity_1.User, {
            email,
            password,
        });
    }
    async findOneByEmail(email) {
        const data = await this.userRepository.findOneByEmail(email);
        return data;
    }
    async existsByEmail(email) {
        return await this.userRepository.existsByEmail(email);
    }
    async verificationUser(user, entityManager = this.entityManager) {
        return await this.updateTransactionUser(user, {
            status: user_interface_1.STATUS_USER.ACTIVE,
        }, entityManager);
    }
    async saveTransactionUser(user, entityManager = this.entityManager) {
        return await entityManager.save(user);
    }
    async updateUser(email, payload, entityManager = this.entityManager) {
        return await this.updateTransactionUser({ email }, payload, entityManager);
    }
    async updateTransactionUser(user, payload, entityManager = this.entityManager) {
        return entityManager.update(user_entity_1.User, user, payload || {});
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        typeorm_1.EntityManager])
], UserService);
//# sourceMappingURL=user.service.js.map