import { NextFunction } from "express";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { healthcheck } from "../business/health";

export async function health(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    const response = healthcheck();
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
}
