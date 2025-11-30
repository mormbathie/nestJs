import {Injectable} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import { log } from 'console';

@Injectable()
export class TaskService{
  constructor(private readonly prisma : PrismaService) {}
  async create(CreateTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data:{
        email : CreateTaskDto.email,
        name: CreateTaskDto.name,

      }

    })
  }
  async findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(id: number){
    console.log("id dans service:", id);
   const task =  await this.prisma.task.findUnique(
      {where: {id}});
      if(!task){
        throw new Error (`Task with id ${id} not found`);
      }
      return task;
  
  }

  async update(id: number, updateTaskDto: UpdateTaskDto){

    await this.findOne(id);

    return this.prisma.task.update({
      where: {id},
      data: {
        email : updateTaskDto.email,
        name: updateTaskDto.name,
      },
    });
  }

  async remove(id: number){
    const task = await this.prisma.task.findUnique({where: {id}});
    if(!task){
      throw new Error (`Task with id ${id} not found`);
    }

    await this.findOne(id);

    await this.prisma.task.delete({
      where: {id},
    });

    return (`${task.name}  est bien supprimé`);
  }
}