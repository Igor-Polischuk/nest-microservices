import { Test, TestingModule } from '@nestjs/testing';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';

describe('CaseController', () => {
  let caseController: CaseController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CaseController],
      providers: [CaseService],
    }).compile();

    caseController = app.get<CaseController>(CaseController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(caseController.getHello()).toBe('Hello World!');
    });
  });
});
