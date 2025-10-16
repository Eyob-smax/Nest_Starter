import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class GeneralInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    const url = request.url;

    console.log(`Incoming Request: ${method} ${url} with the ip ${request.ip}`);

    return next.handle().pipe(
      map((data) => {
        return { success: true, data };
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
}
