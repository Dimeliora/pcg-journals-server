import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { USER_NOT_AUTHORIZED } from '../auth.constants';
import { IPayload } from '../interfaces/payload.interface';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    try {
      const authorization = request.headers.authorization;
      const [bearer, token] = authorization.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new Error();
      }

      const payload = this.jwtService.verify<IPayload>(token);
      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException(USER_NOT_AUTHORIZED);
    }
  }
}
