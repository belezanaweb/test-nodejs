import HttpStatusCodes from 'http-status-codes';

import ProductSchema from '../../../domain/schemas/Product';
import { IUpdateProductUseCase } from '../../../domain/use-cases/product';
import {
    IController,
    IHttpRequest,
    IHttpResponse,
} from '../../../presentation/protocols';

import ProductDTO from '../ProductDTO';

import UpdateProductSchema from './UpdateProductParamsSchema';

export default class UpdateProductController implements IController {
    constructor(
    private updateProductUseCase: IUpdateProductUseCase,
    ) { }

    async handle(request: IHttpRequest): Promise<IHttpResponse> {
        const { sku } = await UpdateProductSchema.validateAsync(request.params);
        const data: ProductDTO = await ProductSchema.validateAsync(request.body);

        return {
            body: await this.updateProductUseCase.execute(sku, data),
            statusCode: HttpStatusCodes.OK,
        };
    }
}
