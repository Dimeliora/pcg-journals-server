import { Model, Document } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcryptjs';

import { User, UserDocument } from './schemas/user.schema';
import { RolesService } from '../roles/roles.service';
import { USER_NOT_FOUND_ERROR } from '../auth/auth.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly rolesService: RolesService,
  ) {}

  private async getUserById(id: string): Promise<User & Document> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new Error();
      }

      return user;
    } catch (error) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userModel
      .findOne({ username })
      .populate('roles')
      .exec();

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel
      .find()
      .select('-passwordHash -__v')
      .populate('roles')
      .exec();

    return users;
  }

  async createUser(username: string, passwordHash: string): Promise<User> {
    const user = new this.userModel({ username, passwordHash });

    const role = await this.rolesService.getRoleByValue('USER');
    user.roles = [role];
    await user.save();

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);

    await user.delete();
  }

  async updateUserPassword(id: string, password: string): Promise<void> {
    const user = await this.getUserById(id);

    const salt = await genSalt(8);
    const passwordHash = await hash(password, salt);

    await user.updateOne({ passwordHash });
  }
}
