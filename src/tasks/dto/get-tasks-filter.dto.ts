import { TaskStatus } from '../tasks.model';
import { IsOptional, IsEnum, IsString } from 'class-validator';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  project?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
