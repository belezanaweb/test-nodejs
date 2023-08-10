import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../utils/winston";
import { createBusiness, findAll, findBySku } from "../business/product";

export async function createController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    const response = await createBusiness(req.body);
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    logger.error(error);

    if (error.message === "Product already exists") {
      return res.status(StatusCodes.CONFLICT).json({ message: error.message });
    }
    next(error);
  }
}

export async function findAllController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    const response = await findAll();
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
}

export async function findBySkuController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    const response = await findBySku(parseInt(req.params.sku));
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }

    next(error);
  }
}
