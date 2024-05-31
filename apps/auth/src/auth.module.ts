import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PostgresConnectionModule } from 'libs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './database/entities/token.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from 'proto/user';

@Module({
  imports: [
    PostgresConnectionModule.forRoot('AUTH_SERVICE'),
    TypeOrmModule.forFeature([TokenEntity]),
    ClientsModule.register([
      {
        name: USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'user-service:50051',
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, '../user.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
