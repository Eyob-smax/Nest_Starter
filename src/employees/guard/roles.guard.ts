import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator.js';
import { Utils } from '../utils/general.utils.js';
import { Request } from 'express';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly utils: Utils,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    const token = context.switchToHttp().getRequest<Request>().cookies.token;
    const result = this.utils.verifyToken(token);
    if (!result?.decoded?.['isAdmin']) {
      throw new ForbiddenException('Only the super admin can hit this route');
    }
    return true;
  }
}
