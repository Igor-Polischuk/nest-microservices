import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'GET_USER' })
  getUser(id: string): string {
    return this.usersService.getUser(id);
  }

  @EventPattern('USER_EVENT')
  userEvent(eventData: number) {
    console.log(`Handle some event that affect user. Event data: ${eventData}`);
  }
}
