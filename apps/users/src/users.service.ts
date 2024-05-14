import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUser(id: string): string {
    return `User with ${id} from microservice!`;
  }
}
