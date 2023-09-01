import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskModel } from './tasks.schema';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.schema';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Returns all available tasks for the user' })
  async getTasks(
    @Query() filterDTO: GetTasksFilterDTO,
    @GetUser() user: User,
  ): Promise<TaskModel[]> {
    if (Object.keys(filterDTO).length) {
      return await this.tasksService.getTasksWithFilter(filterDTO, user);
    } else {
      return await this.tasksService.getAllTasks(user);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new task for the user' })
  @ApiParam({
    name: 'title',
    required: true,
    description: 'Field with task title',
  })
  @ApiParam({
    name: 'description',
    required: true,
    description: 'Field with task description',
  })
  @ApiParam({
    name: 'project',
    required: true,
    description: 'project name to which task is going to be attached',
  })
  @ApiResponse({ status: 200, description: 'Success', type: TaskModel })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async postTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<TaskModel> {
    return await this.tasksService.createTask(createTaskDTO, user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Returns a task with specified id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: TaskModel,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async returnTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<TaskModel> {
    return await this.tasksService.getTaskById(id, user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deletes a task with specified id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: TaskModel,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteTaskRecord(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<any> {
    return await this.tasksService.deleteTask(id, user);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Updates a task with specified id' })
  @ApiParam({ name: 'title', required: true, description: 'Title field' })
  @ApiParam({
    name: 'description',
    required: true,
    description: 'Description field',
  })
  @ApiParam({
    name: 'project',
    description: 'field with project name',
  })
  @ApiParam({
    name: 'status',
    description: 'Status of current task',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: TaskModel,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async updateTaskRecord(
    @Param('id') id: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): Promise<TaskModel> {
    return await this.tasksService.updateTask(id, updateTaskDTO);
  }
}
