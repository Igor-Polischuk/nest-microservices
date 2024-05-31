import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PostgresConnectionModule } from 'libs/common';

@Module({
  imports: [PostgresConnectionModule.forRoot('AUTH_SERVICE')],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
