import ProductDTO from '../../../use-cases/product/ProductDTO';

import Product from '../../entities/Product';

export default interface IUpdateProductUseCase {
  execute(sku: number, data: ProductDTO): Promise<Product>
}
