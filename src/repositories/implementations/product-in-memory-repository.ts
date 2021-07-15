import { ProductModel } from '../../domain/models/product'
import { CreateProductDTO, ICreateProductRepository } from '../create-product'
import { IDeleteProductRepository } from '../delete-product'
import { IFindProductBySkuRepository } from '../find-product-by-sku'
import { IUpdateProductRepository, UpdateProductDTO } from '../update-product'

export class ProductInMemoryRepository implements
  ICreateProductRepository,
  IFindProductBySkuRepository,
  IUpdateProductRepository,
  IDeleteProductRepository {
  private products: ProductModel[] = []

  async all (): Promise<ProductModel[]> {
    return this.products
  }

  async create (productData: CreateProductDTO): Promise<ProductModel> {
    const newProduct: ProductModel = productData
    this.products.push(newProduct)
    return this.calculateProperties(newProduct)
  }

  async findBySku (sku: number): Promise<ProductModel | undefined> {
    const product = this.products.find(product => product.sku === sku)

    return !product ? undefined : this.calculateProperties(product)
  }

  async update ({ sku, ...data }: UpdateProductDTO): Promise<ProductModel> {
    const findIndex = this.products.findIndex(product => product.sku === sku)
    Object.assign(this.products[findIndex], data)

    return this.calculateProperties(this.products[findIndex])
  }

  async delete (sku: number): Promise<void> {
    const indexOf = this.products.findIndex(
      (product) => product.sku === sku
    )
    this.products.splice(indexOf)
  }

  calculateProperties (product: ProductModel): ProductModel {
    product.inventory.quantity = product.inventory.warehouses.reduce(
      (quantity, warehouse) => quantity + warehouse.quantity, 0
    )
    product.isMarketable = product.inventory.quantity > 0

    return product
  }
}
