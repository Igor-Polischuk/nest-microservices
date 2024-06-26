import { NestFactory } from '@nestjs/core';
import { CaseModule } from './case.module';
import { CASE_PACKAGE_NAME } from 'proto/case';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CaseModule,
    {
      transport: Transport.GRPC,
      options: {
        package: CASE_PACKAGE_NAME,
        protoPath: join(__dirname, '../case.proto'),
        url: '0.0.0.0:50051',
      },
    },
  );

  app.listen();
}
bootstrap();
