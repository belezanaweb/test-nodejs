import { Request, Response, NextFunction } from "@express";
import ProductNotFoundError from "../../errors/ProductNotFoundError";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500; // Default status code for internal server error
  let errorMessage = "Internal Server Error";

  if (err instanceof ProductNotFoundError) {
    statusCode = 404;
    errorMessage = err.message;
  }

  res.status(statusCode).json({ error: errorMessage });
}

export default errorHandler;
