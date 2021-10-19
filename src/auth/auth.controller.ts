import {
  UsePipes,
  UseGuards,
  Controller,
  Body,
  Post,
  HttpCode,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('register')
  register(@Body() authDto: AuthDTO) {
    return this.authService.register(authDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() authDto: AuthDTO) {
    return this.authService.login(authDto);
  }
}
