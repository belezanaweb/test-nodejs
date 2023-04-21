import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"
import swaggerUi  from 'swagger-ui-express';
import router from "./routes";
import swaggerDocs from './swagger.json';
import { AppError } from "./shared/excepetions/errors";
import '../src/shared/container'

const app = express();

app.use(express.json());
app.use(router);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };