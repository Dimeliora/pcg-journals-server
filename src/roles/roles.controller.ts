import { Controller, Query, Body, Get, Post } from '@nestjs/common';

import { RolesService } from './roles.service';
import { CreateRoleDTO } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  getRole(@Query('value') value: string) {
    return this.rolesService.getRole(value);
  }

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDTO) {
    return this.rolesService.createRole(createRoleDto);
  }
}
