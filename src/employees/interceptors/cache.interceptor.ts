import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import type { RedisClientType } from '@redis/client';
import { Observable } from 'rxjs';

export class CacheInterceptor implements NestInterceptor {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const key = `${request.method}:${request.url}`;

    return new Observable((subscriber) => {
      this.redisClient.get(key).then((catchedData) => {
        if (catchedData) {
          subscriber.next({
            data: JSON.parse(catchedData as string),
            cached: true,
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
