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
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Buyer = class Buyer extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Buyer.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(2),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Buyer.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(2),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Buyer.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsEmail(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Buyer.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(2),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Buyer.prototype, "city", void 0);
__decorate([
    class_validator_1.IsMobilePhone('en-NL'),
    typeorm_1.Column('text', { nullable: false }),
    __metadata("design:type", String)
], Buyer.prototype, "telephoneNumber", void 0);
Buyer = __decorate([
    typeorm_1.Entity()
], Buyer);
exports.default = Buyer;
//# sourceMappingURL=entity.js.map