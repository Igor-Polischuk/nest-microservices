import { Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateUserDto,
  FindOneUserDto,
  User,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceClient,
} from 'proto/user';

@Injectable()
export class UsersService {
  private userGrpcService: UserServiceClient;
  constructor(@Inject(USER_PACKAGE_NAME) private grpcClient: ClientGrpc) {
    this.userGrpcService =
      grpcClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async createUser(createUserDto: CreateUserDto): Promise<Observable<User>> {
    return this.userGrpcService.createUser(createUserDto);
  }

  async findUserById({ id }: FindOneUserDto) {
    return this.userGrpcService.findUserById({ id });
  }
}
