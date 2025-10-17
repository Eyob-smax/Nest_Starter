import { Global, Module } from '@nestjs/common';
import { Utils } from './general.utils.js';
@Global()
@Module({
  providers: [Utils],
  exports: [Utils],
})
export class UtilsModule {}
