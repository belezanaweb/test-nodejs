import { Response, Request, NextFunction } from 'express';

const ErrorHandler = (error: Error, _request: Request, response: Response, _next: NextFunction): Response<any> => {
  if(error.message.includes('not found')) {
    return response.status(404).json({
      message: error.message,
    });
  }
  return response.status(500).json({
    message: error.message,
  });
};

export default ErrorHandler;
