import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CaseModule } from './case/case.module';

@Module({
  imports: [UsersModule, AuthModule, CaseModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
