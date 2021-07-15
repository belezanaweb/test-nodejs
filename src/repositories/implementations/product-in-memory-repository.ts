import { ProductModel } from '../../domain/models/product'
import { CreateProductDTO, ICreateProductRepository } from '../create-product'
import { IFindProductBySkuRepository } from '../find-product-by-sku'

export class ProductInMemoryRepository implements ICreateProductRepository, IFindProductBySkuRepository {
  private products: ProductModel[] = []

  async all (): Promise<ProductModel[]> {
    return this.products
  }

  async create (productData: CreateProductDTO): Promise<ProductModel> {
    const newProduct: ProductModel = productData
    this.products.push(newProduct)
    return newProduct
  }

  async findBySku (sku: number): Promise<ProductModel | undefined> {
    const product = this.products.find(product => product.sku === sku)
    return product
  }
}
