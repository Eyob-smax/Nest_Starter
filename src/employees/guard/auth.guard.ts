import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private verifyToken(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return { success: false, message: 'Unauthorized' };
    }
    return { success: true, decoded };
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.token;
    if (!token) {
      throw new UnauthorizedException('Token not found!');
    }
    const result = this.verifyToken(token);
    if (!result.success) {
      throw new ForbiddenException(
        "You're not authenticated to view this page!",
      );
    }
    return true;
  }
}
