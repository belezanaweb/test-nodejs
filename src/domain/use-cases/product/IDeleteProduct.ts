export default interface IDeleteProductUseCase {
  execute(sku: number): Promise<void>
}
