import { TaskStatus } from '../tasks.model';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  project: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
