import { STATUS_CODE } from './../../util/types';
import { CustomError } from '../../util/custom.error';
import { Request, Response } from 'express';
import { ProductService } from './product.service';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  getAll(_: Request, response: Response) {
    const products = this.productService.getAll();
    return response.json(products);
  }

  getBySku({ params }: Request, response: Response) {
    try {
      const product = this.productService.getBySku(Number(params.sku));
      return response.json(product);
    } catch (error) {
      return this.errorResponse(response, error);
    }
  }

  create({ body }: Request, response: Response) {
    try {
      const newProduct = this.productService.create(body);
      return response.status(STATUS_CODE.CREATED).json(newProduct);
    } catch (error) {
      return this.errorResponse(response, error);
    }
  }

  update({ params, body }: Request, response: Response) {
    try {
      const product = this.productService.update(Number(params.sku), body);
      return response.status(STATUS_CODE.SUCCESS).json(product);
    } catch (error) {
      return this.errorResponse(response, error);
    }
  }

  delete({ params }: Request, response: Response) {
    this.productService.delete(Number(params.sku));
    return response.status(STATUS_CODE.NO_CONTENT).send();
  }

  errorResponse(response: Response, error: CustomError) {
    return response.status(error.statusCode || STATUS_CODE.INTERNAL_ERROR).json({ error: error.message });
  }
}
