import HttpStatusCodes from 'http-status-codes';

import ProductSchema from '../../../domain/schemas/Product';
import { ICreateProductUseCase } from '../../../domain/use-cases/product';
import {
    IController,
    IHttpRequest,
    IHttpResponse,
} from '../../../presentation/protocols';

import ProductDTO from '../ProductDTO';

export default class CreateProductController implements IController {
    constructor(
    private createProductUseCase: ICreateProductUseCase,
    ) { }

    async handle(request: IHttpRequest): Promise<IHttpResponse> {
        const data: ProductDTO = await ProductSchema.validateAsync(request.body);

        return {
            body: await this.createProductUseCase.execute(data),
            statusCode: HttpStatusCodes.CREATED,
        };
    }
}
