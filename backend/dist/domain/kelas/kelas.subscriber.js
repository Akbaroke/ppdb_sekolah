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
exports.KelasSubscriber = void 0;
const typeorm_1 = require("typeorm");
const kelas_entity_1 = require("./kelas.entity");
let KelasSubscriber = class KelasSubscriber {
    constructor(dataSource) {
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return kelas_entity_1.Kelas;
    }
    async beforeUpdate(event) {
        const now = new Date().getTime();
        event.entity.updated_at = now;
    }
};
exports.KelasSubscriber = KelasSubscriber;
exports.KelasSubscriber = KelasSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], KelasSubscriber);
//# sourceMappingURL=kelas.subscriber.js.map