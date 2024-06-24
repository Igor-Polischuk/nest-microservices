import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDto } from 'proto/user';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  SignInDto,
  TokensDTO,
} from 'proto/auth';
import { callGrpcService } from 'libs/common';

@Injectable()
export class AuthService {
  private authGrpcService: AuthServiceClient;
  constructor(@Inject(AUTH_PACKAGE_NAME) private grpcClient: ClientGrpc) {
    this.authGrpcService =
      grpcClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async signUp(createUserDto: CreateUserDto): Promise<TokensDTO> {
    return callGrpcService(this.authGrpcService.signUp(createUserDto));
  }

  async signIn(credentials: SignInDto): Promise<TokensDTO> {
    return callGrpcService(this.authGrpcService.signIn(credentials));
  }
}
