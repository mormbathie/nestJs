import { Body, Controller, Post,Get } from "@nestjs/common";
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
}