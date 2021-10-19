import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { AuthDTO } from './dto/auth.dto';
import {
  INVALID_PASSWORD_ERROR,
  USER_ALREADY_EXISTS_ERROR,
  USER_NOT_FOUND_ERROR,
} from './auth.constants';
import { User } from 'src/users/schemas/user.schema';
import { IToken } from './interfaces/token.interface';

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

  private async generateToken({ _id, username, roles }: User): Promise<IToken> {
    const payload = { id: _id, username, roles };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register({
    username,
    password,
  }: AuthDTO): Promise<Omit<User, 'passwordHash'>> {
    const candidate = await this.usersService.getUserByUsername(username);

    if (candidate) {
      throw new BadRequestException(USER_ALREADY_EXISTS_ERROR);
    }

    const salt = await genSalt(8);
    const passwordHash = await hash(password, salt);

    const user = await this.usersService.createUser(username, passwordHash);

    return { _id: user._id, username: user.username, roles: user.roles };
  }

  async login({ username, password }: AuthDTO): Promise<IToken> {
    const user = await this.validateUser(username, password);

    return this.generateToken(user);
  }
}
