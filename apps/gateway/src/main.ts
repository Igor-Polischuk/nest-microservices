import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { RpcExceptionFilter } from 'libs/common/filters';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.useGlobalFilters(new RpcExceptionFilter());
  await app.listen(3000);
}
bootstrap();
