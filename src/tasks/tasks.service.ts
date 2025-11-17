import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;
  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: (this.nextId++).toString(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      done: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }
  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
      const task =  this.tasks.find(task => task.id === id.toString());
      if(!task){
          throw new Error(`Task with id ${id} not found`);
      }
      return task
  }

  // update(id: number, updateTaskDto: UpdateTaskDto) {
  //   return `This action updates a #${id} task`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} task`;
  // }
}
