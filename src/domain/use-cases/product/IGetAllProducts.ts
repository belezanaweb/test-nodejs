import Product from '../../entities/Product';

export default interface IGetAllProductUseCase {
  execute(): Promise<Product[]>
}
