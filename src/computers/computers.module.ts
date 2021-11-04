import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { ComputersService } from './computers.service';
import { ComputersController } from './computers.controller';
import { Computer, ComputerSchema } from './schemas/computer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Computer.name, schema: ComputerSchema },
    ]),
    UsersModule,
    AuthModule,
  ],
  providers: [ComputersService],
  controllers: [ComputersController],
})
export class ComputersModule {}
