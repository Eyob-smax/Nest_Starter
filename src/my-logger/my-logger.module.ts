import { Global, Module } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service.js';
@Global()
@Module({
  exports: [MyLoggerService],
  providers: [MyLoggerService],
})
export class MyLoggerModule {}
