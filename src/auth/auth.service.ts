import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcryptjs';

import { UsersService } from '../users/users.service';

import {
  INVALID_PASSWORD_ERROR,
  USER_ALREADY_EXISTS_ERROR,
  USER_NOT_FOUND_ERROR,
} from './auth.constants';
import { AuthDTO } from './dto/auth.dto';
import { User } from 'src/users/schemas/user.schema';
import { SafeUser } from 'src/users/interfaces/safeUser.interface';
import { IAuthentication } from './interfaces/authentication.interface';

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
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }

    const isPasswordValid = await compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException(INVALID_PASSWORD_ERROR);
    }

    return user;
  }

  private async generateToken({
    _id,
    username,
    roles,
  }: SafeUser): Promise<string> {
    const payload = { _id, username, roles };

    return await this.jwtService.signAsync(payload);
  }

  async register({ username, password }: AuthDTO): Promise<SafeUser> {
    const candidate = await this.usersService.getUserByUsername(username);

    if (candidate) {
      throw new BadRequestException(USER_ALREADY_EXISTS_ERROR);
    }

    const salt = await genSalt(8);
    const passwordHash = await hash(password, salt);

    const user = await this.usersService.createUser(username, passwordHash);

    return { _id: user._id, username: user.username, roles: user.roles };
  }

  async authenticate({
    _id,
    username,
    roles,
  }: SafeUser): Promise<IAuthentication> {
    const access_token = await this.generateToken({ _id, username, roles });

    return {
      access_token,
      user: {
        _id,
        username,
        roles,
      },
    };
  }

  async login({ username, password }: AuthDTO): Promise<IAuthentication> {
    const user = await this.validateUser(username, password);

    return this.authenticate(user);
  }
}
