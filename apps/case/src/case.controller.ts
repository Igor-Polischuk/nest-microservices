import { Controller, Get } from '@nestjs/common';
import { CaseService } from './case.service';

@Controller()
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Get()
  getHello(): string {
    return this.caseService.getHello();
  }
}
