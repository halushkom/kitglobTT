import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { Project } from './project.schema';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.schema';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(AuthGuard())
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new project for the user' })
  @ApiParam({
    name: 'name',
    required: true,
    description: 'Field with project name',
  })
  @ApiParam({
    name: 'description',
    required: true,
    description: 'Field with project description',
  })
  @ApiResponse({ status: 200, description: 'Success', type: Project })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async postProject(
    @Body() createProjectDTO: CreateProjectDTO,
    @GetUser() user: User,
  ): Promise<Project> {
    return await this.projectService.createProject(createProjectDTO, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Returns all available projects for the current user',
  })
  async getAllProjects(@GetUser() user: User): Promise<Project[]> {
    return await this.projectService.getAllProjectsByUserId(user);
  }
}
