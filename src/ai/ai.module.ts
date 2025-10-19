import { Module } from '@nestjs/common';
import { AiService } from './ai.service.js';
import { AiController } from './ai.controller.js';

@Module({
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
