import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CASE_PACKAGE_NAME } from 'proto/case';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CASE_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'case-service:50051',
          package: CASE_PACKAGE_NAME,
          protoPath: join(__dirname, '../case.proto'),
        },
      },
    ]),
  ],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}
