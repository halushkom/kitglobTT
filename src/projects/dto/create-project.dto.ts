import { IsNotEmpty, IsString } from 'class-validator';
export class CreateProjectDTO {
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;
}
