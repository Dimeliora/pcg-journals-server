import {
  UsePipes,
  UseGuards,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Request,
} from '@nestjs/common';

import { ComputersService } from './computers.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { JWTGuard } from '../auth/guards/jwt.guard';
import { CreateComputerDTO } from './dto/create-computer.dto';
import { IRequestWithUser } from '../../interfaces/requestWithUser.interface';

@UseGuards(JWTGuard)
@Controller('computers')
export class ComputersController {
  constructor(private readonly computersService: ComputersService) {}

  @Get(':id')
  getComputer(@Param('id') id: string) {
    return this.computersService.getComputerById(id);
  }

  @Get()
  getAllComputers() {
    return this.computersService.getAllComputers();
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

  @Patch(':id')
  updateComputer(
    @Body() createComputerDTO: CreateComputerDTO,
    @Request() req: IRequestWithUser,
    @Param('id') id: string,
  ) {
    return this.computersService.updateComputer(
      createComputerDTO,
      req.user.username,
      id,
    );
  }

  @Delete(':id')
  deleteComputer(@Param('id') id: string) {
    return this.computersService.deleteComputer(id);
  }
}
