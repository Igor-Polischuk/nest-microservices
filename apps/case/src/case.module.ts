import { Module } from '@nestjs/common';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';
import { PostgresConnectionModule } from 'libs/common';

@Module({
  imports: [PostgresConnectionModule.forRoot('CASE_SERVICE')],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}
