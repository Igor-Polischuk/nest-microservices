import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AUTH_PACKAGE_NAME } from 'proto/auth';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'libs/common/guards/auth.guard';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'auth-service:50051',
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../auth.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
