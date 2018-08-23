import { JsonController, Post, Get, Param, HttpCode, Body, NotFoundError, CurrentUser, Authorized, Patch } from 'routing-controllers'
import Event from '../events/entity'
import {Ticket} from './entity'
import {User} from '../users/entity';

@JsonController()
export default class TicketsController {

    @Get('/events/:id([0-9]+)/tickets')
    async getTickets(
        @Param('id') eventId: number
    ) {
        const tickets =  await Ticket.query(`SELECT * FROM tickets WHERE event_id=${eventId}`)

        return {tickets }
    }

    @Get('/tickets/:id([0-9]+)')
    async getTicket(
      @Param('id') id: number
    ) {

        return await Ticket.query(`SELECT * FROM tickets WHERE id=${id}`)
    }
   
    @Authorized()
    @HttpCode(201)
    @Post('/events/:id([0-9]+)/tickets')
    async createTicket(
        @Param('id') eventId: number,
        @Body() ticket : Ticket,
        @CurrentUser() user: User
    ) {
        const event = await Event.findOne(eventId)
        if(!event) throw new NotFoundError('Event not Found!')
      
        const entity = await Ticket.create(ticket)
        if (entity){
        entity.event = event
        entity.user = user
        }
        const newTicket = await entity.save()

        user.ticketCounter++
        await user.save()        
        
        const [ticketPayload] = await Ticket.query(`SELECT * FROM tickets WHERE id=${newTicket.id}`)

        return {ticketPayload}
    }

    @Authorized()
    @HttpCode(200)
    @Patch('/tickets/:id([0-9]+)')
    async updateTicket(
        @Param('id') id: number,
        @Body() update : Partial<Ticket>
    ) {

        const ticket = await Ticket.findOne(id)
        if(!ticket) throw new NotFoundError('Ticket not found!')
        
        const updatedTicket = await Ticket.merge(ticket,update).save()

        return await Ticket.query(`SELECT * FROM tickets WHERE id=${updatedTicket.id}`)

        
    }
}