import HttpStatusCodes from 'http-status-codes';
import { IGetAllProductsUseCase } from '../../../domain/use-cases/product';

import {
    IController,
    IHttpResponse,
} from '../../../presentation/protocols';

export default class GetAllProductController implements IController {
    constructor(
    private getAllProductUseCase: IGetAllProductsUseCase,
    ) { }

    async handle(): Promise<IHttpResponse> {
        return {
            body: await this.getAllProductUseCase.execute(),
            statusCode: HttpStatusCodes.OK,
        };
    }
}
