import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  FindUserByEmailDto,
  FindUserByIdDto,
  User,
  UserServiceController,
  UserServiceControllerMethods,
} from 'proto/user';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}
  findUserByEmail({
    email,
  }: FindUserByEmailDto): User | Observable<User> | Promise<User> {
    return this.usersService.findByEmail(email);
  }

  createUser(
    createUserDTO: CreateUserDto,
  ): User | Observable<User> | Promise<User> {
    return this.usersService.createUser(createUserDTO);
  }

  findUserById({
    id,
  }: FindUserByIdDto): User | Promise<User> | Observable<User> {
    return this.usersService.findById(id);
  }
}
