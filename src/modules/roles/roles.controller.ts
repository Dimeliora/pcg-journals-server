import { UsePipes, UseGuards, Controller, Body, Post } from '@nestjs/common';

import { RolesService } from './roles.service';
import { CreateRoleDTO } from './dto/create-role.dto';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Roles('ADMIN')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDTO) {
    return this.rolesService.createRole(createRoleDto);
  }
}
