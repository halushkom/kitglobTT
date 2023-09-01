import { IsNotEmpty } from 'class-validator';
export class CreateTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  project: string;
}
