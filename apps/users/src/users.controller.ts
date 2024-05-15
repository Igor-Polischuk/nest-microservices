import { Controller, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  FindOneUserDto,
  User,
  UserServiceController,
  UserServiceControllerMethods,
} from 'proto/user';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  private users: User[] = [];

  constructor(private readonly usersService: UsersService) {}

  createUser(userDto: CreateUserDto): User | Observable<User> | Promise<User> {
    const newUser: User = { ...userDto, id: this.users.length + '' };
    this.users.push(newUser);

    return newUser;
  }

  findUserById({
    id,
  }: FindOneUserDto): User | Promise<User> | Observable<User> {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      return {
        email: 'default',
        id: 'id',
        name: 'micro',
        lastName: 'service',
        password: 'secret',
      };
      throw new NotFoundException('Not found such user');
    }

    return user;
  }
}
