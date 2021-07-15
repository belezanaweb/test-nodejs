import { ProductModel } from '../../domain/models/product'
import { CreateProductDTO, ICreateProductRepository } from '../create-product'
import { IFindProductBySkuRepository } from '../find-product-by-sku'
import { IUpdateProductRepository, UpdateProductDTO } from '../update-product'

export class ProductInMemoryRepository implements ICreateProductRepository, IFindProductBySkuRepository, IUpdateProductRepository {
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

  async update ({ sku, ...data }: UpdateProductDTO): Promise<ProductModel> {
    const findIndex = this.products.findIndex(product => product.sku === sku)
    Object.assign(this.products[findIndex], data)

    return this.products[findIndex]
  }
}
