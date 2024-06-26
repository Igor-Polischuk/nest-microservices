import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'proto/user';
import { RefreshTokenDTO, SignInDto } from 'proto/auth';
import { Public } from 'libs/common/guards';
import { CurrentUser } from 'libs/common/decorators';
import { TokenPayload } from 'apps/auth/src/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/sign-up')
  signUp(@Body() createUser: CreateUserDto) {
    return this.authService.signUp(createUser);
  }

  @Public()
  @Post('/sign-in')
  signIn(@Body() credentials: SignInDto) {
    return this.authService.signIn(credentials);
  }

  @Public()
  @Post('/refresh')
  refresh(@Body() { refreshToken }: RefreshTokenDTO) {
    return this.authService.refresh(refreshToken);
  }

  @Get('/private-test')
  privateTest(@CurrentUser() user: TokenPayload) {
    return user;
  }

  @Public()
  @Get('/public-test')
  publicTest() {
    return { message: 'Hello, everyone!' };
  }
}
