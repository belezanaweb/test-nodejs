import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware, NotFoundError } from 'routing-controllers';

@Middleware({ type: 'after' })
export class NotFoundHandlerMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: NextFunction): void {
    if (!response.headersSent) {
      throw new NotFoundError('Not Found.');
    }

    next();
  }
}
