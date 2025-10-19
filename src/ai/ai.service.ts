import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { OpenAI } from 'openai';
import { ConfigService } from '@nestjs/config';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

@Injectable()
export class AiService {
  private client: OpenAI;
  private portfolio: unknown;
  constructor(private readonly config: ConfigService) {
    this.client = new OpenAI({
      baseURL: this.config.getOrThrow('HF_API_BASE_URL'),
      apiKey: this.config.getOrThrow('HF_TOKEN'),
    });
  }
  private async generateAnswer(prompt: string) {
    const chatCompletion = await this.client.chat.completions.create({
      model: 'inclusionAI/Ling-1T:featherless-ai',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return chatCompletion.choices[0].message;
  }
  query(prompt: string) {
    try {
      if (!prompt) {
        throw new BadRequestException('Prompt is required!');
      }
      return this.generateAnswer(prompt);
    } catch (err) {
      throw new InternalServerErrorException(
        'Something wen wrong: ' + err.message,
      );
    }
  }
}
