import { RequestHandler } from "express";
import { OK } from "http-status";
import Joi from "joi";

import { ControllerBase } from "../../../application/Controller";
import { buildErrorInfo } from "../../../infrastructure/parser/ErrorInfo";
import { IProductService } from "../../../service/ProductService";
import productSkuSchema from "../schemas/ProductSkuSchema";
import BadRequestError from "../../../domain/exceptions/BadRequestError";
import { ProductResquestData } from "../dto/productResquest";
import productSchema from "../schemas/ProductSchema";

export default class UpdateProductController extends ControllerBase {
  constructor(private productService: IProductService) {
    super('put', '/product/:sku');
    this.setHandler(this.handler);
  }

  handler: RequestHandler = async (request, response) => {
    try {
      const sku = Number(request.params.sku);
      const productData = request.body as ProductResquestData;

      try {
        Joi.assert(sku, productSkuSchema);
        Joi.assert(productData, productSchema);
      } catch (err: any) {
        throw new BadRequestError(err.details.map((detail: any) => detail.message).join(', '));
      }

      const product = await this.productService.update(productData);

      return response.status(OK).json(product);
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);

      console.error('fail to update product', {
        extra: {
          httpMethod: request.method,
          method: 'handlerUpdateProduct',
          url: request.url,
          errorInfo,
        },
      });

      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  }
}
