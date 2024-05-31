/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get } from '@nestjs/common';
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
    request: SignInDto,
  ): TokensDTO | Promise<TokensDTO> | Observable<TokensDTO> {
    throw new Error('Method not implemented.');
  }
  refreshToken(
    request: RefreshTokenDTO,
  ): TokensDTO | Promise<TokensDTO> | Observable<TokensDTO> {
    throw new Error('Method not implemented.');
  }
  signUp(
    request: CreateUserDto,
  ): TokensDTO | Promise<TokensDTO> | Observable<TokensDTO> {
    throw new Error('Method not implemented.');
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

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}
