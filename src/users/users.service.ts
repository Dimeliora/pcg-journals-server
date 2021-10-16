import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly rolesService: RolesService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel
      .find()
      .select('-passwordHash -__v')
      .populate('roles')
      .exec();
    return users;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userModel
      .findOne({ username })
      .populate('roles')
      .exec();
    return user;
  }

  async createUser(userData: Omit<User, 'roles'>): Promise<User> {
    const user = new this.userModel(userData);

    const role = await this.rolesService.getRoleByValue('USER');
    user.roles = [role];

    await user.save();

    return user;
  }
}
