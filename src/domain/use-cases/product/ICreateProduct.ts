import ProductDTO from '../../../use-cases/product/ProductDTO';

import Product from '../../entities/Product';

export default interface ICreateProductUseCase {
  execute(data: ProductDTO): Promise<Product>
}
