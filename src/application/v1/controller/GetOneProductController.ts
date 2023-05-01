import { RequestHandler } from "express";
import { OK } from "http-status";
import Joi from "joi";

import { ControllerBase } from "../../../application/Controller";
import { buildErrorInfo } from "../../../infrastructure/parser/ErrorInfo";
import { IProductService } from "../../../service/ProductService";
import productSkuSchema from "../schemas/ProductSkuSchema";
import BadRequestError from "../../../domain/exceptions/BadRequestError";

export default class GetOneProductController extends ControllerBase {
  constructor(private productService: IProductService) {
    super('get', '/product/:sku');
    this.setHandler(this.handler);
  }

  handler: RequestHandler = async (request, response) => {
    try {
      const sku = Number(request.params.sku);

      try {
        Joi.assert(sku, productSkuSchema);
      } catch (err: any) {
        throw new BadRequestError(err.details.map((detail: any) => detail.message).join(', '));
      }

      const product = await this.productService.getBySku(sku);

      return response.status(OK).json(product);
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);

      console.error('fail to get product', {
        extra: {
          httpMethod: request.method,
          method: 'handlerGetProduct',
          url: request.url,
          errorInfo,
        },
      });

      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  }
}
