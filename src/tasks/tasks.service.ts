import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskModel } from './tasks.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from '../auth/user.schema';
import { Project } from '../projects/project.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TaskModel.name) private taskModel: Model<TaskModel>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async getAllTasks(user: User): Promise<TaskModel[]> {
    return this.taskModel.find({ user: user }).exec();
  }

  async getTasksWithFilter(
    filterDTO: GetTasksFilterDTO,
    user: User,
  ): Promise<TaskModel[]> {
    const { status, project, search } = filterDTO;
    let tasks = await this.getAllTasks(user);
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (project) {
      tasks = tasks.filter((task) => task.project === project);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  async createTask(
    createTaskDTO: CreateTaskDTO,
    user: User,
  ): Promise<TaskModel> {
    let { title, description, project } = createTaskDTO;

    const createdTask = new this.taskModel({
      title,
      description,
      project,
      user,
    });
    let existingProject: any = await this.projectModel.findOne({
      name: project,
    });
    createdTask.save();
    existingProject.tasks.push(createdTask._id);
    await existingProject.save();
    return createdTask;
  }

  async getTaskById(id: string, user: User): Promise<TaskModel> {
    const existingTask = this.taskModel.findOne({ _id: id, user: user });

    if (!existingTask) {
      throw new NotFoundException();
    }

    return existingTask;
  }

  async deleteTask(id: string, user: User): Promise<any> {
    const found = await this.getTaskById(id, user);
    if (!found) {
      throw new NotFoundException();
    }
    return this.taskModel.deleteOne({ _id: id });
  }

  async updateTask(id: string, updateTask: UpdateTaskDTO): Promise<TaskModel> {
    return await this.taskModel.findByIdAndUpdate(id, updateTask).exec();
  }
}
