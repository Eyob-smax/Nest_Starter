import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { DatabaseModule } from './database/database.module.js';
import { EmployeesModule } from './employees/employees.module.js';

import { MyLoggerModule } from './common/my-logger/my-logger.module.js';
import { AuthModule } from './auth/auth.module.js';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GeneralInterceptor } from './common/interceptors/general.interceptor.js';
import { RedisModule } from './redis/redis.module.js';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    AuthModule,
    EmployeesModule,
    MyLoggerModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GeneralInterceptor,
    },
  ],
})
export class AppModule {}
