import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { FORBIDDEN_ROUTE_ERROR, USER_NOT_AUTHORIZED } from '../auth.constants';
import { IPayload } from '../interfaces/payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    try {
      const authorization = request.headers.authorization;
      const [bearer, token] = authorization.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new Error();
      }

      const payload = this.jwtService.verify<IPayload>(token);
      request.user = payload;

      const hasPermission = payload.roles.some((role) =>
        requiredRoles.includes(role.value),
      );
      if (!hasPermission) {
        throw new ForbiddenException(FORBIDDEN_ROUTE_ERROR);
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      throw new UnauthorizedException(USER_NOT_AUTHORIZED);
    }
  }
}
