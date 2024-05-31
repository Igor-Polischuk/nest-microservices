import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TokensDTO } from 'proto/auth';
import {
  CreateUserDto,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceClient,
} from 'proto/user';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private userGrpcService: UserServiceClient;
  constructor(@Inject(USER_PACKAGE_NAME) private grpcClient: ClientGrpc) {
    this.userGrpcService =
      grpcClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }
  async sigUp(createUserDto: CreateUserDto): Promise<TokensDTO> {
    const user = await firstValueFrom(
      this.userGrpcService.createUser(createUserDto),
    );

    return {
      accessToken: user.id,
      refreshToken: user.email,
    };
  }
}
