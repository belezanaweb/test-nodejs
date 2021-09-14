import { NextFunction, Request, Response } from "express";
import { logger } from "../../logs";

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} - ${req.url}`);
  next();
}

export { logRequest }
