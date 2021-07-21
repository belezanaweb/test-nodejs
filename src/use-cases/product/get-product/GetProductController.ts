import HttpStatusCodes from 'http-status-codes';
import { IGetProductUseCase } from '../../../domain/use-cases/product';

import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '../../../presentation/protocols';

import GetProductSchema from './GetProductSchema';

export default class GetProductController implements IController {
  constructor(
    private getProductUseCase: IGetProductUseCase,
  ) { }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { sku } = await GetProductSchema.validateAsync(request.params);

    return {
      body: await this.getProductUseCase.execute(sku),
      statusCode: HttpStatusCodes.OK,
    };
  }
}
