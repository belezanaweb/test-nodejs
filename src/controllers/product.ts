import { Request, Response, NextFunction } from "express";
import { createBusiness, findAll, findBySku, remove, update } from "../business/product";
import { StatusCodes } from "http-status-codes";
import { logger } from "../utils/winston";

export async function createController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    const response = await createBusiness(req.body);
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    if (error.message === "Product already exists") {
      logger.error(error.message);
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
      logger.info(error.message);
      return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
    next(error);
  }
}

export async function updateController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    const response = await update(parseInt(req.params.sku), req.body);
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    if (error.message === "Product not found") {
      logger.error(error);
      return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
    next(error);
  }
}

export async function removeController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    await remove(parseInt(req.params.sku));
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    if (error.message === "Product not found") {
      logger.error(error.message);
      return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
    next(error);
  }
}


