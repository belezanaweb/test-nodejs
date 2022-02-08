
export interface IDeleteProductById {
  deleteById: (sku: number) => Promise<void>
}
