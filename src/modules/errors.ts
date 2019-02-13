import { NextFunction, Request } from 'express';
import { Response } from 'express-serve-static-core';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name === 'NotFoundError') { return res.status(404).json(err.message); }
  if (err.name === 'ReferenceError') { return res.status(409).json(err.message); }
  return res.status(400).json(err.message);
};
