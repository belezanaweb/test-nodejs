import { NextFunction, Request, Response } from 'express';
import merge from 'lodash.merge';
import Product from '../models/products';
import { IProduct } from '../resources/interfaces';
import { NotFoundError } from './errors';

export default class Products {
  public createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { sku } = req.body;
      const does_exist = await Product.findOne({ sku });
      if (does_exist) { throw new ReferenceError('SKU already exists!'); }
      await Product.create(req.body);
      return res.status(201).json({ message: 'Product created successfully!' });
    } catch (error) {
      return next(error);
    }
  }
  public getProductBySKU = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { sku } = req.params;
      const product = await this.checkDoesSKUAlreadyExists(sku);
      return res.json(product);
    } catch (error) {
      return next(error);
    }
  }
  public updateProductBySKU = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { sku } = req.params;
      const old_product = await this.checkDoesSKUAlreadyExists(sku);
      const new_product: IProduct = merge(old_product, req.body);
      await Product.findOneAndUpdate({ sku }, new_product);
      return res.status(202).send({ message: 'Product updated successfully!' });
    } catch (error) {
      return next(error);
    }
  }
  public deleteProductBySKU = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { sku } = req.params;
      await this.checkDoesSKUAlreadyExists(sku);
      await Product.findOneAndDelete({ sku });
      return res.status(202).json({ message: 'Product deleted successfully!' });
    } catch (error) {
      return next(error);
    }
  }

  // Helper function: returns product by SKU if it does exist
  private checkDoesSKUAlreadyExists = async (
    sku: number,
  ): Promise<IProduct> => {
    const does_exist = await Product.findOne({ sku });
    if (!does_exist) { throw new NotFoundError('SKU not found!'); }
    return does_exist;
  }
}
