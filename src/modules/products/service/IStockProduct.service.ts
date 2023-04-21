import { IProduct } from "../../../domain/entities/products/Product";

interface IStockProductService {
  execute(product: IProduct): Promise<IProduct>
}

export { IStockProductService }