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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const entity_2 = require("../users/entity");
let EventsController = class EventsController {
    getEvent(id) {
        return entity_1.default.findOne(id);
    }
    async getEvents() {
        const events = await entity_1.default.find();
        return { events };
    }
    async createEvent(event, user) {
        const entity = await entity_1.default.create(event);
        entity.user = user;
        const addedEvent = await entity.save();
        return addedEvent;
    }
    async updateEvent(id, update) {
        const event = await entity_1.default.findOne(id);
        if (!event)
            throw new routing_controllers_1.NotFoundError('Event not found!');
        const updatedEvent = entity_1.default.merge(event, update).save();
        return updatedEvent;
    }
};
__decorate([
    routing_controllers_1.Get('/events/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getEvent", null);
__decorate([
    routing_controllers_1.Get('/events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getEvents", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post('/events'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __param(1, routing_controllers_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default,
        entity_2.User]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createEvent", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.HttpCode(200),
    routing_controllers_1.Patch('/events/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "updateEvent", null);
EventsController = __decorate([
    routing_controllers_1.JsonController()
], EventsController);
exports.default = EventsController;
//# sourceMappingURL=controller.js.map