import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();
    const message =
      (exceptionResponse as HttpException).message || exception?.message;

    response.status(status).send({
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}
