export default interface IDeleteProductRepository {
  delete(sku: number): Promise<void>
}
