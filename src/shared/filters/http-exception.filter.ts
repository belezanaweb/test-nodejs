import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus && exception.getStatus();

    if (!status || status >= 500) {
      Logger.error({
        url: request.url,
        body: request.body,
        exception: {
          stack: exception.stack,
          message: exception.message,
        },
      });

      response.status(status || 500).json({
        httpCode: status || 500,
        name: exception.message['name'] || exception.name,
        message: this.extractMessage(exception) || 'Internal Server Error',
      });
      return;
    }

    if (!response.headersSent) {
      response.status(status).json({
        httpCode: status,
        name: exception.message['name'] || exception.name,
        message: this.extractMessage(exception),
      });
      return;
    }
  }

  private extractMessage(exception: HttpException) {
    return (
      exception.message['message'] ||
      exception.message['error'] ||
      exception.message
    );
  }
}
