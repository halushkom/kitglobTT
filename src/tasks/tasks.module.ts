import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskModel, TaskSchema } from './tasks.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Project, ProjectSchema } from 'src/projects/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskModel.name, schema: TaskSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
