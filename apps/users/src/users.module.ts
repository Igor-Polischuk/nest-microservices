import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common/database/database.module';

@Module({
  imports: [DatabaseModule.forRoot('USER_SERVICE')],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
