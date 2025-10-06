import { Controller, Get, HttpCode, Sse } from '@nestjs/common';
import { AppService } from './app.service.js';
// import { weather } from './chat.js';
import { interval, map, Observable, of } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @HttpCode(200)
  getHello(): Observable<string[]> {
    return of(['hi', 'how are u', "I'm fine", 'bye']).pipe(
      map((arr) => arr.map((str) => str.toUpperCase())),
    );
  }

  @Get('/observe')
  @Sse()
  findAll() {
    return interval(1000).pipe(map(() => ({ data: 'this is the stream!' })));
  }
}
