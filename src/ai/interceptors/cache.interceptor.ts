import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import type { RedisClientType } from 'redis';
import { Observable } from 'rxjs';

export class AiCache implements NestInterceptor {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const key = `${request.method}:${request.url}:${request.body?.['query']}`;

    return new Observable((subscriber) => {
      this.redisClient.get(key).then((cached) => {
        if (cached) {
          subscriber.next({
            cached: true,
            data: JSON.parse(cached as string),
          });
          subscriber.complete();
        } else {
          next.handle().subscribe({
            next: async (data) => {
              subscriber.next({ data, cached: false });
              subscriber.complete();
              await this.redisClient.setEx(key, 60, JSON.stringify(data));
            },
            error: (err) => subscriber.error(err),
          });
        }
      });
    });
  }
}
