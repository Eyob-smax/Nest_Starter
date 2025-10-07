import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';
import { ConsoleLogger } from '@nestjs/common';
import { MyLoggerService } from './my-logger/my-logger.service.js';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: new MyLoggerService(),
  });
  app.use(cookieParser());
  app.enableCors();
  await app.listen(8000);
}
await bootstrap();
