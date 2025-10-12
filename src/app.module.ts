import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { DatabaseModule } from './database/database.module.js';
import { EmployeesModule } from './employees/employees.module.js';

import { MyLoggerModule } from './common/my-logger/my-logger.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    MyLoggerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
