import { JsonController, Post, Get, Param, HttpCode, Body, NotFoundError, CurrentUser, Authorized} from 'routing-controllers'
import {Ticket} from '../tickets/entity'
import Comment from './entity'
import {User} from '../users/entity';


@JsonController()
export default class CommentsController {

    @Get('/tickets/:ticketId([0-9]+)/comments')
    getComments(
      @Param('ticketId') ticketId: number
    ) {
      return Ticket.query(`SELECT * FROM comments WHERE ticket_id=${ticketId}`)
    }

    @Get('/comments/:id([0-9]+)')
    getComment(
      @Param('id') id: number
    ) {
      return Comment.findOne(id)
    }

    @Authorized()
    @HttpCode(201)
    @Post('/tickets/:ticketId([0-9]+)/comments')
    async createComment(
        @Param('ticketId') ticketId: number,
        @Body() comment : Comment,
        @CurrentUser() user: User

    ) {
        const ticket = await Ticket.findOne(ticketId)
        if(!ticket) throw new NotFoundError('Ticket not Found!')

        const entity = await Comment.create(comment)
        if (entity){
          entity.ticket = ticket
          entity.user = user
          }
        const newComment = await entity.save()

        ticket.commentsCounter++
        await ticket.save()
     
        const [commentsPayload] = await Comment.query(`SELECT * FROM comments WHERE id=${newComment.id}`)

        return {commentsPayload}
    }

    
}