import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import UsersController from './users/controller'
import AddsController from './adds/controller';
const cors = require("@koa/cors")


const app = createKoaServer({
   controllers: [
    UsersController,
    AddsController   
  ]
})

setupDb()
  .then(_ =>
    app.listen(4001, () => console.log('Listening on port 4001'))
  )
  .then(_ => app.use(cors()))
  .catch(err => console.error(err))