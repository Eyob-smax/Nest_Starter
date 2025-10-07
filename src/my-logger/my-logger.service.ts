import { ConsoleLogger, Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async writeToLogFile(event: { message: any; timestamp: number }) {
    const dirname = path.dirname(fileURLToPath(import.meta.url));

    const filename = path.join(dirname, 'mylog.log');

    await fs.appendFile(filename, JSON.stringify(event) + '\n');
  }
  log(message: any, context: any) {
    const event = { message: message, timestamp: Date.now() };
    // this.writeToLogFile(event);
    super.log(message, context);
  }

  error(message: any, context: any) {
    const event = { message: message, timestamp: Date.now() };
    // this.writeToLogFile(event);
    super.error(message, context);
  }
}
