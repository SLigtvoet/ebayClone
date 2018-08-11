import { JsonController, Get, Param } from 'routing-controllers'
import Users from './entity';


@JsonController()
export default class UsersController{

    @Get('/users/:id')
    getSeller(
        @Param('id') id: number
    ) {
        return Users.findOne(id)
    }

    @Get('/users')
    async getUsers(){
    const users = await Users.find()
    return { users }
    }
}