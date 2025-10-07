import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class MiddlewareService implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('This is the ip address: ', req.ip);
    console.log('This is the token: ', req.cookies.Token);

    next();
  }
}
