import { Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDto } from 'proto/user';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  TokensDTO,
} from 'proto/auth';

@Injectable()
export class AuthService {
  private authGrpcService: AuthServiceClient;
  constructor(@Inject(AUTH_PACKAGE_NAME) private grpcClient: ClientGrpc) {
    this.authGrpcService =
      grpcClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async signUp(createUserDto: CreateUserDto): Promise<Observable<TokensDTO>> {
    return this.authGrpcService.signUp(createUserDto);
  }
}
