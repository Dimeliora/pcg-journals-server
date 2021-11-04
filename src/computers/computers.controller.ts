import {
  UsePipes,
  UseGuards,
  Controller,
  Body,
  Post,
  Param,
  Get,
  Request,
} from '@nestjs/common';

import { ComputersService } from './computers.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JWTGuard } from '../auth/guards/jwt.guard';
import { CreateComputerDTO } from './dto/create-computer.dto';
import { IRequestWithUser } from '../interfaces/requestWithUser.interface';

@UseGuards(JWTGuard)
@Controller('computers')
export class ComputersController {
  constructor(private readonly computersService: ComputersService) {}

  @Get(':id')
  getComputer(@Param('id') id: string) {
    return this.computersService.getComputerById(id);
  }

  @UsePipes(ValidationPipe)
  @Post()
  createComputer(
    @Body() createComputerDTO: CreateComputerDTO,
    @Request() req: IRequestWithUser,
  ) {
    return this.computersService.createComputer(
      createComputerDTO,
      req.user.username,
    );
  }
}
