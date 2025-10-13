import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { error } from 'console';
import { Response, Request } from 'express';

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const status = exception.getStatus();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(status).json({
      error: exception.name,
      message: exception.message,
      statusCode: status,
      timeStamp: new Date().toDateString(),
      where: `This error happend in ${request.path} on the method ${request.method}`,
    });
  }
}
