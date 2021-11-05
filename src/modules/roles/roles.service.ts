import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDTO } from './dto/create-role.dto';
import { ROLE_ALREADY_EXISTS_ERROR } from './roles.constants';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.roleModel.findOne({ value }).exec();

    return role;
  }

  async createRole(createRoleDto: CreateRoleDTO): Promise<Role> {
    try {
      const role = await this.roleModel.create(createRoleDto);

      return role;
    } catch (error) {
      throw new BadRequestException(ROLE_ALREADY_EXISTS_ERROR);
    }
  }
}
