import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'proto/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  createUser(@Body() createUser: CreateUserDto) {
    console.log(12345);
    return this.authService.signUp(createUser);
  }
}
