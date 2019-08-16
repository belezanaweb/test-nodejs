import { NextFunction, Request, Response } from 'express';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: HttpError, request: Request, response: Response, next: NextFunction): void {
    const { httpCode: status = 500, message } = error;

    response.status(status).send({ status, message });
  }
}
