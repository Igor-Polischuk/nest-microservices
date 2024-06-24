/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  LogOutDTO,
  RefreshTokenDTO,
  SignInDto,
  TokensDTO,
  VerifyAccessTokenDTO,
} from 'proto/auth';
import { BoolValue } from 'google/protobuf/wrappers';
import { CreateUserDto, User } from 'proto/user';
import { Observable } from 'rxjs';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  signIn(
    credentials: SignInDto,
  ): TokensDTO | Promise<TokensDTO> | Observable<TokensDTO> {
    return this.authService.signIn(credentials);
  }
  refreshToken(
    request: RefreshTokenDTO,
  ): TokensDTO | Promise<TokensDTO> | Observable<TokensDTO> {
    throw new Error('Method not implemented.');
  }
  signUp(
    request: CreateUserDto,
  ): TokensDTO | Promise<TokensDTO> | Observable<TokensDTO> {
    return this.authService.sigUp(request);
  }
  logOut(
    request: LogOutDTO,
  ): BoolValue | Promise<BoolValue> | Observable<BoolValue> {
    throw new Error('Method not implemented.');
  }
  verifyAccessToken(
    request: VerifyAccessTokenDTO,
  ): User | Promise<User> | Observable<User> {
    throw new Error('Method not implemented.');
  }
}
