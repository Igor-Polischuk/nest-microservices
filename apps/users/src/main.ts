import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME } from 'proto/user';
import { join } from 'path';

async function bootstrap() {
  console.log('main');
  console.log(join(__dirname, '../user.proto'));
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.GRPC,
      options: {
        package: USER_PACKAGE_NAME,
        protoPath: join(__dirname, '../user.proto'),
        url: '0.0.0.0:50051',
      },
    },
  );

  app.listen();
}
bootstrap();
