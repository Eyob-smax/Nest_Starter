import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        try {
          const client = createClient({ url: 'redis://localhost:6379' });

          client.on('error', (err) => console.error('Redis Client Error', err));

          await client.connect();
          return client;
        } catch (err) {
          console.error('Redis Client Error', err);
          throw err;
        }
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
