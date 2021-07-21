import Product from '../../../domain/entities/Product';
import { IGetAllProductsUseCase } from '../../../domain/use-cases/product';
import IGetAllProductsRepository from '../../../repositories/IGetAllProductsRepository';

export default class GetAllProductUseCase implements IGetAllProductsUseCase {
    constructor(
    private readonly repository: IGetAllProductsRepository
    ) { }

    async execute(): Promise<Product[]> {
        return await this.repository.getAll();
    }
}
