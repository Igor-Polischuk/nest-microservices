import { Controller, Get, Param } from '@nestjs/common';
import { CaseService } from './case.service';
import { Case } from 'proto/case';
import { Public } from 'libs/common/guards';

@Controller('/case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Get('/:id')
  @Public()
  getCase(@Param('id') id: string): Promise<Case> {
    return this.caseService.getCase(id);
  }
}
