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
exports.BlacklistService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let BlacklistService = class BlacklistService {
    constructor() {
        this.blacklistFilePath = path.join(__dirname, 'blacklist.json');
        this.resetInterval = 24 * 60 * 60 * 1000;
    }
    readBlacklist() {
        try {
            const data = fs.readFileSync(this.blacklistFilePath, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            return { tokens: [], lastReset: Date.now() };
        }
    }
    writeBlacklist(data) {
        try {
            fs.writeFileSync(this.blacklistFilePath, JSON.stringify(data, null, 2), 'utf8');
        }
        catch (error) {
            console.error('Gagal menulis ke file blacklist.json', error);
        }
    }
    resetBlacklist() {
        const blacklistData = this.readBlacklist();
        blacklistData.tokens = [];
        blacklistData.lastReset = Date.now();
        this.writeBlacklist(blacklistData);
    }
    addTokenToBlacklist(tokenId) {
        const blacklistData = this.readBlacklist();
        blacklistData.tokens.push(tokenId);
        this.writeBlacklist(blacklistData);
    }
    isTokenBlacklisted(tokenId) {
        const blacklistData = this.readBlacklist();
        const timeSinceLastReset = Date.now() - blacklistData.lastReset;
        if (timeSinceLastReset >= this.resetInterval) {
            this.resetBlacklist();
        }
        return blacklistData.tokens.includes(tokenId);
    }
};
exports.BlacklistService = BlacklistService;
exports.BlacklistService = BlacklistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BlacklistService);
//# sourceMappingURL=blacklist.service.js.map