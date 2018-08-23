import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import UsersController from './users/controller'
import EventsController from './events/controller';
import {Action} from 'routing-controllers'
import { verify } from './jwt'
import LoginController from './logins/controller';
import TicketsController from './tickets/controller';
import {User} from './users/entity';
import CommentsController from './comments/controller';
const cors = require("@koa/cors")


const app = createKoaServer({
   controllers: [
    UsersController,
    EventsController,
    LoginController,
    TicketsController,
    CommentsController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
  
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      return !!(token && verify(token))
    }
    return false
  },
  
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ")

      if (token) {
        const { id } = verify(token)
        return User.findOne(id)
      }
    }
    return undefined
  }

})

setupDb()
  .then(_ =>
    app.listen(4001, () => console.log('Listening on port 4001'))
  )
  .then(_ => app.use(cors()))
  .catch(err => console.error(err))