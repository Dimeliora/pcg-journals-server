import {
  UseGuards,
  Controller,
  Body,
  Param,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { ValidationPipe } from '../../pipes/validation.pipe';

@UseGuards(RolesGuard)
@Roles('ADMIN')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Patch(':id')
  updateUserPassword(
    @Param('id') id: string,
    @Body(new ValidationPipe()) { password }: UpdatePasswordDTO,
  ) {
    return this.usersService.updateUserPassword(id, password);
  }
}
