import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project, ProjectSchema } from './project.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from '../tasks/tasks.module';
import { TaskSchema, TaskModel } from '../tasks/tasks.schema';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: TaskModel.name, schema: TaskSchema },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
