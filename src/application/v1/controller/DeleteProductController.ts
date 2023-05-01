import { RequestHandler } from "express";
import { NO_CONTENT } from "http-status";
import Joi from "joi";

import { ControllerBase } from "../../../application/Controller";
import { buildErrorInfo } from "../../../infrastructure/parser/ErrorInfo";
import { IProductService } from "src/service/ProductService";
import productSkuSchema from "../schemas/ProductSkuSchema";
import BadRequestError from "../../../domain/exceptions/BadRequestError";

export default class DeleteProductController extends ControllerBase {
  constructor(private productService: IProductService) {
    super('delete', '/product/:sku');
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

      await this.productService.delete(sku);

      return response.status(NO_CONTENT).send();
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);

      console.error('fail to delete product', {
        extra: {
          httpMethod: request.method,
          method: 'handlerDeleteProduct',
          url: request.url,
          errorInfo,
        },
      });

      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  }
}
