import { Body, Controller, Post,Get, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly usersService : UserService) { }

    @Post()
    create(@Body()createUserDto: CreateUserDto){
        return this.usersService.createUser(createUserDto)
    }

    @Get()
    findAll(){
        return this.usersService.findAllUsers()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findOneUser(id)
    }
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto){
        return this.usersService.updateUser(id, updateUserDto)
    }
}