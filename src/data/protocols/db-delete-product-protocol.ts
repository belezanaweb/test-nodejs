export interface IDbDeleteProductById {
  deleteById: (sku: number) => Promise<void>
}
