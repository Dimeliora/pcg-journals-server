import { Controller, Body, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDTO) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: CreateUserDTO) {
    return this.authService.login(createUserDto);
  }
}
