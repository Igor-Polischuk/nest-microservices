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
  refreshToken({
    refreshToken,
  }: RefreshTokenDTO): TokensDTO | Promise<TokensDTO> | Observable<TokensDTO> {
    return this.authService.refreshToken(refreshToken);
  }
  signUp(
    request: CreateUserDto,
  ): TokensDTO | Promise<TokensDTO> | Observable<TokensDTO> {
    return this.authService.sigUp(request);
  }
  logOut(
    request: LogOutDTO,
  ): BoolValue | Promise<BoolValue> | Observable<BoolValue> {
    return this.authService.logout(request.refreshToken);
  }
  verifyAccessToken({
    accessToken,
  }: VerifyAccessTokenDTO): User | Promise<User> | Observable<User> {
    return this.authService.verifyToken(accessToken);
  }
}
