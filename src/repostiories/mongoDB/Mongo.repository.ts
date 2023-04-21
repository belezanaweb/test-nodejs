import { IProduct } from "../../entities/products/Product";
import { ICreateProductDTO } from "../../modules/products/dtos/ICreateProductDTO";
import { IProductsRepository } from "../IProducts.repository";
import { Product } from "./schemas/Product.Schema";

export class MongoRepository implements IProductsRepository {
  async create(newProduct: ICreateProductDTO): Promise<IProduct> {
    const { sku, name, inventory } = newProduct
    let product = await Product.create({
      sku,
      name,
      inventory,
      isDeleted: false
    })
    return product.save()
  }

  async getProduct(sku: number): Promise<IProduct | null> {
    const foundProduct = await Product.findOne({ sku })
    return foundProduct
  }

  async update(sku: number, data: IProduct): Promise<IProduct | null> {
    const updatedProduct = await Product.findOneAndUpdate({ sku: sku }, data, { returnDocument: 'after' })
    return updatedProduct
  }

  async delete(sku: number, product: IProduct): Promise<void> {
    await Product
      .findOneAndUpdate({ sku: sku }, product)
      .catch(err => {
        throw err
      })
  }
}