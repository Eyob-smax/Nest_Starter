import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { MyLoggerService } from './my-logger/my-logger.service.js';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: new MyLoggerService(),
  });
  app.enableCors();
  await app.listen(8000);
}
await bootstrap();
