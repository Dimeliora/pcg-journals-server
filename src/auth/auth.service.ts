import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import {
  INVALID_PASSWORD_ERROR,
  USER_ALREADY_EXISTS_ERROR,
  USER_NOT_FOUND_ERROR,
} from './auth.constants';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.getUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isPasswordValid = await compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException(INVALID_PASSWORD_ERROR);
    }

    return user;
  }

  private async generateToken({ username, roles }: User) {
    const payload = { username, roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register({ username, password }: CreateUserDTO) {
    const candidate = await this.usersService.getUserByUsername(username);

    if (candidate) {
      throw new BadRequestException(USER_ALREADY_EXISTS_ERROR);
    }

    const salt = await genSalt(8);
    const passwordHash = await hash(password, salt);

    const user = await this.usersService.createUser({ username, passwordHash });
    return user;
  }

  async login({ username, password }: CreateUserDTO) {
    const user = await this.validateUser(username, password);

    return this.generateToken(user);
  }
}
