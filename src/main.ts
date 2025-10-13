import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { MyLoggerService } from './common/my-logger/my-logger.service.js';
import cookieParser from 'cookie-parser';

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
