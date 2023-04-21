import { IProduct } from "../entities/products/Product"
import { ICreateProductDTO } from "../../modules/products/dtos/ICreateProductDTO"
import { IUpdateProductDTO } from "../../modules/products/dtos/IUpdateProductDTO"

interface IProductsRepository {
  create(product: ICreateProductDTO): Promise<IProduct>
  getProduct(sku: number): Promise<IProduct | null>
  update(sku: number, data: IUpdateProductDTO): Promise<IProduct | null>
  delete(sku: number, data: IProduct): Promise<void>
}

export { IProductsRepository }