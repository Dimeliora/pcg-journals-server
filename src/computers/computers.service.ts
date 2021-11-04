import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersService } from '../users/users.service';
import { Computer, ComputerDocument } from './schemas/computer.schema';
import { CreateComputerDTO } from './dto/create-computer.dto';
import { COMPUTER_NOT_FOUND } from './computer.constants';

@Injectable()
export class ComputersService {
  constructor(
    @InjectModel(Computer.name) private computerModel: Model<ComputerDocument>,
    private readonly userService: UsersService,
  ) {}

  async getComputerById(id: string): Promise<ComputerDocument> {
    try {
      const computer = await this.computerModel
        .findById(id)
        .populate('lastModifier', 'username')
        .exec();
      if (!computer) {
        throw new Error();
      }

      return computer;
    } catch (error) {
      throw new NotFoundException(COMPUTER_NOT_FOUND);
    }
  }

  async createComputer(
    createComputerDto: CreateComputerDTO,
    username: string,
  ): Promise<ComputerDocument> {
    const computer = new this.computerModel(createComputerDto);

    const modifier = await this.userService.getUserByUsername(username);
    computer.lastModifier = modifier;

    await computer.save();
    return computer;
  }
}
