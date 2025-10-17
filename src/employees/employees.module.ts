import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service.js';
import { EmployeesController } from './employees.controller.js';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import CustomExceptionModule from '../common/exceptions/customException.module.js';
import HttpExceptionFilter from '../common/filters/HttpExceptionFilter.filter.js';
import { AuthGuard } from './guard/auth.guard.js';
import { Utils } from './utils/general.utils.js';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 60000,
        limit: 5,
      },
    ]),
    CustomExceptionModule,
  ],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class EmployeesModule {}
