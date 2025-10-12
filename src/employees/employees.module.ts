import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { EmployeesService } from './employees.service.js';
import { EmployeesController } from './employees.controller.js';
import { DatabaseModule } from '../database/database.module.js';
import { AuthMiddleware } from '../common/middleware/authMiddleware.service.js';

@Module({
  imports: [],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/employees',
      method: RequestMethod.ALL,
    });
  }
}
