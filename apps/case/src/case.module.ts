import { Module } from '@nestjs/common';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';

@Module({
  imports: [],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}
