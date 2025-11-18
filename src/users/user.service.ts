import { Injectable } from "@nestjs/common";
import { User } from "./entites/user.entityt";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
   private users: User[] = [];
   private nextId = 1;
   
   createUser(createUserDto: CreateUserDto): User{
         const newUser: User = {    
            id: this.nextId++,
            name: createUserDto.name,
            email: createUserDto.email,
            isActive: createUserDto.isActive,
         };
         this.users.push(newUser);
         return newUser;
   }

findAllUsers(): User[]{
    return this.users;
   }
}