import { JsonController, Get, Param, Post, Body, HttpCode } from 'routing-controllers'
import Adds from './entity';


@JsonController()
export default class AddsController{

    @Get('/adds/:id')
    getSeller(
        @Param('id') id: number
    ) {
        return Adds.findOne(id)
    }

    @Get('/adds')
    async getAdds(){
        const adds = await Adds.find()
        return { adds }
    }

    @Post('/adds')
    @HttpCode(201)
    createAdd(
        @Body() add: Adds
    ){
        return add.save()
    }

}