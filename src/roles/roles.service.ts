import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDTO } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async getRole(value: string): Promise<Role> {
    const role = await this.roleModel.findOne({ value }).exec();
    return role;
  }

  async createRole(createRoleDto: CreateRoleDTO): Promise<Role> {
    const role = await this.roleModel.create(createRoleDto);
    return role;
  }
}
