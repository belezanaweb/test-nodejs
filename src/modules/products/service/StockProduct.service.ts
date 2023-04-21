import { IProduct } from "../../../domain/entities/products/Product";

export class StockProductService {
  async execute (product: IProduct): Promise<IProduct> {
    const { inventory: { warehouses } } = product
    const quantity = warehouses.reduce((total, { quantity }) => total + quantity, 0)
    Object.assign(product, { isMarketable: (quantity > 0), inventory: { quantity, warehouses }})
    return product
  }
}