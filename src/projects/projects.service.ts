import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './project.schema';
import { Model } from 'mongoose';
import { CreateProjectDTO } from './dto/create-project.dto';
import { User } from 'src/auth/user.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async createProject(
    createProjectDTO: CreateProjectDTO,
    user: User,
  ): Promise<Project> {
    const { name, description } = createProjectDTO;
    const project = new this.projectModel({
      name,
      description,
      createdBy: user,
    });
    return project.save();
  }

  async getProjectById(id: string, user: User): Promise<Project> {
    return await this.projectModel.findOne({ _id: id, createdBy: });
  }

  async getAllProjectsByUserId(user: User): Promise<Project[]> {
    return await this.projectModel.find({ createdBy: user });
  }
}
