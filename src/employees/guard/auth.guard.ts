import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Utils } from '../utils/general.utils.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly utils: Utils) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.token;
    if (!token) {
      throw new UnauthorizedException('Token not found!');
    }
    const result = this.utils.verifyToken(token);
    if (!result.success) {
      throw new ForbiddenException(
        "You're not authenticated to view this page!",
      );
    }
    return true;
  }
}
