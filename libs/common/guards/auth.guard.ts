import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AuthServiceClient,
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
} from 'proto/auth';
import { Request } from 'express';
import { callGrpcService } from '../utils';
import { TokenPayload } from 'apps/auth/src/types';
import { IS_PUBLIC_KEY } from './public';
import { Reflector } from '@nestjs/core';

export class AuthGuard implements CanActivate {
  private authGrpcService: AuthServiceClient;
  constructor(
    @Inject(AUTH_PACKAGE_NAME) private grpcClient: ClientGrpc,
    private reflector: Reflector,
  ) {
    this.authGrpcService =
      grpcClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: TokenPayload }>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await callGrpcService(
      this.authGrpcService.verifyAccessToken({ accessToken: token }),
    );
    request.user = { email: payload.email, id: payload.id };

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
