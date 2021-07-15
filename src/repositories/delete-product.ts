export interface IDeleteProductRepository {
  delete(sku: number): Promise<void>
}
