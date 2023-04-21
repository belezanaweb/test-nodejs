import { IProduct } from "../../../entities/products/Product";

interface IStockProductService {
  execute(product: IProduct): Promise<IProduct>
}

export { IStockProductService }