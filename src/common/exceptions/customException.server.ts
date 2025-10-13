import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export default class CustomException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }

  somethingWentWrong() {
    return new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
