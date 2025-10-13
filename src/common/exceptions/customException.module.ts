import { Module } from '@nestjs/common';
import CustomException from './customException.server.js';

@Module({
  providers: [CustomException],
  exports: [CustomException],
})
export default class CustomExceptionModule {}
