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
const entity_1 = require("../events/entity");
const entity_2 = require("./entity");
const entity_3 = require("../users/entity");
let TicketsController = class TicketsController {
    async getTickets(eventId) {
        const tickets = await entity_2.Ticket.query(`SELECT * FROM tickets WHERE event_id=${eventId}`);
        return { tickets };
    }
    async getTicket(id) {
        return await entity_2.Ticket.query(`SELECT * FROM tickets WHERE id=${id}`);
    }
    async createTicket(eventId, ticket, user) {
        const event = await entity_1.default.findOne(eventId);
        if (!event)
            throw new routing_controllers_1.NotFoundError('Event not Found!');
        const entity = await entity_2.Ticket.create(ticket);
        if (entity) {
            entity.event = event;
            entity.user = user;
        }
        const newTicket = await entity.save();
        user.ticketCounter++;
        await user.save();
        const [ticketPayload] = await entity_2.Ticket.query(`SELECT * FROM tickets WHERE id=${newTicket.id}`);
        return { ticketPayload };
    }
    async updateTicket(id, update) {
        const ticket = await entity_2.Ticket.findOne(id);
        if (!ticket)
            throw new routing_controllers_1.NotFoundError('Ticket not found!');
        const updatedTicket = await entity_2.Ticket.merge(ticket, update).save();
        return await entity_2.Ticket.query(`SELECT * FROM tickets WHERE id=${updatedTicket.id}`);
    }
};
__decorate([
    routing_controllers_1.Get('/events/:id([0-9]+)/tickets'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getTickets", null);
__decorate([
    routing_controllers_1.Get('/tickets/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "getTicket", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.HttpCode(201),
    routing_controllers_1.Post('/events/:id([0-9]+)/tickets'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __param(2, routing_controllers_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, entity_2.Ticket,
        entity_3.User]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "createTicket", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.HttpCode(200),
    routing_controllers_1.Patch('/tickets/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TicketsController.prototype, "updateTicket", null);
TicketsController = __decorate([
    routing_controllers_1.JsonController()
], TicketsController);
exports.default = TicketsController;
//# sourceMappingURL=controller.js.map