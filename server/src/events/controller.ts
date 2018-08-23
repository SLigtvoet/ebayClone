import { JsonController, Get, Param, Post, Body, HttpCode, CurrentUser, Authorized, Patch, NotFoundError } from 'routing-controllers'
import Event from './entity';
import {User} from '../users/entity'


@JsonController()
export default class EventsController{

    @Get('/events/:id')
    getEvent(
        @Param('id') id: number
    ) {
        return Event.findOne(id)
    }

    @Get('/events')
    async getEvents(){
        const events = await Event.find()
        return { events }
    }

    @Authorized()
    @Post('/events')
    @HttpCode(201)
    async createEvent(
        @Body() event: Event,
        @CurrentUser() user: User,
    ){
        const entity = await Event.create(event)
        entity.user = user
        console.log(entity)
        console.log(user)
        const addedEvent = await entity.save()
        return addedEvent

    }

    @Authorized()
    @HttpCode(200)
    @Patch('/events/:id([0-9]+)')
    async updateEvent(
        @Param('id') id: number,
        @Body() update : Partial<Event>
    ) {

        const event = await Event.findOne(id)
        if(!event) throw new NotFoundError('Event not found!')
        
        const updatedEvent = Event.merge(event,update).save()

        return updatedEvent
    }
}