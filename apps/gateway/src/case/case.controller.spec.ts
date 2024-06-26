import { Test, TestingModule } from '@nestjs/testing';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';

describe('CaseController', () => {
  let controller: CaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaseController],
      providers: [CaseService],
    }).compile();

    controller = module.get<CaseController>(CaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
