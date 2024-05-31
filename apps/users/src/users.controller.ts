import { Controller } from '@nestjs/common';
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
  constructor(private readonly usersService: UsersService) {}

  createUser(
    createUserDTO: CreateUserDto,
  ): User | Observable<User> | Promise<User> {
    return this.usersService.createUser(createUserDTO);
  }

  findUserById({
    id,
  }: FindOneUserDto): User | Promise<User> | Observable<User> {
    return this.usersService.findById(id);
  }
}
