import { RequestHandler } from "express";
import { CREATED } from "http-status";
import Joi from "joi";

import { ControllerBase } from "../../../application/Controller";
import { buildErrorInfo } from "../../../infrastructure/parser/ErrorInfo";
import { IProductService } from "../../../service/ProductService";
import { ProductResquestData } from "../dto/productResquest";
import productSchema from "../schemas/ProductSchema";
import BadRequestError from "../../../domain/exceptions/BadRequestError";

export default class CreateProductController extends ControllerBase {
  constructor(private productService: IProductService) {
    super('post', '/product');
    this.setHandler(this.handler);
  }

  handler: RequestHandler = async (request, response) => {
    try {
      const productData = request.body as ProductResquestData;

      try {
        Joi.assert(productData, productSchema);
      } catch (err: any) {
        throw new BadRequestError(err.details.map((detail: any) => detail.message).join(', '));
      }

      const productId = await this.productService.create(productData);

      return response.status(CREATED).json({ productId });
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);

      console.error('fail to create product', {
        extra: {
          httpMethod: request.method,
          method: 'handlerCreateProduct',
          url: request.url,
          errorInfo,
        },
      });

      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  }
}
