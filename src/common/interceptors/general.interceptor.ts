import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class GeneralInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const time = Date.now();
    return next.handle().pipe(
      map((data) => {
        console.log(`Took ${Date.now() - time}ms`);
        return data.cached
          ? { success: true, cached: true, data: data.data }
          : { success: true, cached: false, data: data.data };
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
}
