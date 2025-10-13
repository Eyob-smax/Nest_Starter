import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export default class CustomException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
