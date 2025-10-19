import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AiService } from './ai.service.js';
import { AiCache } from './interceptors/cache.interceptor.js';
import { CreateAiDto } from './dto/create-ai.dto.js';

@Controller('query')
@UseInterceptors(AiCache)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  getAnswer(@Body(ValidationPipe) body: CreateAiDto) {
    return this.aiService.query(body.query);
  }
}
