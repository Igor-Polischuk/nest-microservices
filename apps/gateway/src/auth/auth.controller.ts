import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'proto/user';
import { SignInDto } from 'proto/auth';
import { AuthGuard } from 'libs/common/guards/auth.guard';

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
  @UseGuards(AuthGuard)
  privateTest(@Req() req: any) {
    return req.user;
  }
}
