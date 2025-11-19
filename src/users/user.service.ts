import { Injectable } from "@nestjs/common";
import { User } from "./entites/user.entityt";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

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
   
   findOneUser(id: number): User {  
        const user =  this.users.find(user => user.id === id);      
        if(!user){
            throw new Error(`User with id ${id} not found`);
        }      
        return user
   }

   updateUser(id: number, UpdateUserDto: UpdateUserDto){
    const user = this.findOneUser(id);
    if(UpdateUserDto.name !== undefined){
        user.name = UpdateUserDto.name;
    }
    if(UpdateUserDto.email !== undefined){
        user.email = UpdateUserDto.email;
    }
    if(UpdateUserDto.isActive !== undefined){
        user.isActive = UpdateUserDto.isActive;
    }
    return user;
   }
}