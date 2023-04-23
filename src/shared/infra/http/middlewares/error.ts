import { CelebrateError, isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import AppError from '../../../errors/AppError';

export default function error(
  err: AppError | CelebrateError,
  _: Request,
  res: Response,
  __: NextFunction,
): Response {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      name: err.name || 'INTERNAL_SERVER_ERROR',
      error: {
        service: 'BELEZANAWEB API',
        code: err.code || '0001',
      },
      message: err.message || 'Internal Server Error',
      trace: err.trace,
    });
  }

  if (isCelebrateError(err)) {
    return res.status(400).json({
      name: 'VALIDATION_ERROR',
      error: {
        service: 'BELEZANAWEB API',
        code: '0002',
      },
      message: err.details.entries().next().value[1].message,
      trace: 'default',
    });
  }

  return res.status(500).json({
    name: 'INTERNAL_SERVER_ERROR',
    error: {
      service: 'BELEZANAWEB API',
      code: '0001',
    },
    message: 'Internal Server Error',
    trace: 'default',
  });
}
