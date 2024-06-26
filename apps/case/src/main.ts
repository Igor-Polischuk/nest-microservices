import { NestFactory } from '@nestjs/core';
import { CaseModule } from './case.module';

async function bootstrap() {
  const app = await NestFactory.create(CaseModule);
  await app.listen(3000);
}
bootstrap();
