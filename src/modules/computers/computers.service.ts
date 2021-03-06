import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersService } from '../users/users.service';
import { Computer, ComputerDocument } from './schemas/computer.schema';
import { CreateComputerDTO } from './dto/create-computer.dto';
import {
  COMPUTER_NOT_FOUND,
  getComputerCreatedMessage,
  getComputerUpdatedMessage,
  getComputerDeletedMessage,
} from './computer.constants';
import { ISuccessMessage } from '../../interfaces/successMessage.interface';

@Injectable()
export class ComputersService {
  constructor(
    @InjectModel(Computer.name) private computerModel: Model<ComputerDocument>,
    private readonly userService: UsersService,
  ) {}

  async getAllComputers(): Promise<ComputerDocument[]> {
    const computers = await this.computerModel
      .find()
      .populate('lastModifier', 'username')
      .exec();

    return computers;
  }

  async createComputer(
    createComputerDto: CreateComputerDTO,
    username: string,
  ): Promise<ISuccessMessage> {
    const computer = new this.computerModel(createComputerDto);

    const modifier = await this.userService.getUserByUsername(username);
    computer.lastModifier = modifier;

    await computer.save();

    return {
      message: getComputerCreatedMessage(computer.pcName),
    };
  }

  async updateComputer(
    createComputerDto: CreateComputerDTO,
    username: string,
    id: string,
  ): Promise<ISuccessMessage> {
    try {
      const computer = await this.computerModel
        .findByIdAndUpdate(id, createComputerDto, { new: true })
        .exec();

      const modifier = await this.userService.getUserByUsername(username);
      computer.lastModifier = modifier;
      await computer.save();

      return { message: getComputerUpdatedMessage(computer.pcName) };
    } catch (error) {
      throw new NotFoundException(COMPUTER_NOT_FOUND);
    }
  }

  async deleteComputer(id: string): Promise<ISuccessMessage> {
    try {
      const computer = await this.computerModel.findByIdAndRemove(id).exec();
      return { message: getComputerDeletedMessage(computer.pcName) };
    } catch (error) {
      throw new NotFoundException(COMPUTER_NOT_FOUND);
    }
  }
}
