import { Request, Response } from 'express';

import ProductsService from './ProductsService';

export const create = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const response = await ProductsService.create(req.body);
    return res.status(201).json(response);
  } catch (e) {
    return res.status(e.error.status).send({ message: e.error.message });
  }
};

export const findOne = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const sku = parseInt(req.params.sku, 10);
  try {
    const response = await ProductsService.findOne(sku);
    return res.json(response);
  } catch (e) {
    return res.status(e.error.status).send({ message: e.error.message });
  }
};

export const update = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const sku = parseInt(req.params.sku, 10);
    const response = await ProductsService.update(sku, req.body);
    return res.json(response);
  } catch (e) {
    return res.status(e.error.status).send({ message: e.error.message });
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const sku = parseInt(req.params.sku, 10);
    const response = await ProductsService.delete(sku);
    return res.json(response);
  } catch (e) {
    return res.status(e.error.status).send({ message: e.error.message });
  }
};
