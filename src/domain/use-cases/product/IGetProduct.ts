import Product from '../../entities/Product';

export default interface IGetProductUseCase {
  execute(sku: number): Promise<Product>
}
