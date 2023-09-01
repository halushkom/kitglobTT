import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.model';


const mockUser = {
  username: 'Max',
  password: `qwerty123`
  tasks: [],
  _id: 'someId1'

}

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GetAllTasks', ()=> {
    it('calls TasksService.getAllTasks and returns the result', async ()=> {
      service.getAllTasks.mockResolvedValue('smth')
      const res = await service.getAllTasks(null, mockUser)
      expect(res).toEqual('smth')
    })
  })
  describe('getTaskById', ()=> {
    it('calls TasksSevive.getAllById and returns the result', async()=> {
      const mockTask = {
        title: 'New Title',
        description: 'New task description',
        _id: 'someId0',
        status: TaskStatus.NEW,
        project: 'home-project'
      }
      service.getTaskById.mockResolvedValue(mockTask, mockUser)
      let result = await service.getTaskById('someId0', mockUser)
      expect(result).toEqual(mockTask)
    })
  })
});
