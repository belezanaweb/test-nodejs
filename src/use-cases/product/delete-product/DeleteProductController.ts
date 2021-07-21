import HttpStatusCodes from 'http-status-codes';
import { IDeleteProductUseCase } from '../../../domain/use-cases/product';

import {
    IController,
    IHttpRequest,
    IHttpResponse,
} from '../../../presentation/protocols';

import DeleteProductSchema from './DeleteProductSchema';

export default class DeleteProductController implements IController {
    constructor(
    private deleteProductUseCase: IDeleteProductUseCase,
    ) { }

    async handle(request: IHttpRequest): Promise<IHttpResponse> {
        const { sku } = await DeleteProductSchema.validateAsync(request.params);

        return {
            body: await this.deleteProductUseCase.execute(sku),
            statusCode: HttpStatusCodes.OK,
        };
    }
}
