import "reflect-metadata"
import 'express-async-errors';
import express, { NextFunction, Request, Response } from "express";

import routes from '@shared/routes';
import '@shared/container';
import AppError from "@shared/errors/AppError";

const app = express();

app.use(express.json());
app.use(routes)


app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error!',
  });
});


app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on port 3333!');
});
