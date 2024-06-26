import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'proto/user';
import { SignInDto } from 'proto/auth';
import { Public } from 'libs/common/guards/public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() createUser: CreateUserDto) {
    return this.authService.signUp(createUser);
  }

  @Post('/sign-in')
  signIn(@Body() credentials: SignInDto) {
    return this.authService.signIn(credentials);
  }

  @Get('/private-test')
  privateTest(@Req() req: any) {
    return req.user;
  }

  @Public()
  @Get('/public-test')
  publicTest() {
    return { message: 'Hello, everyone!' };
  }
}
