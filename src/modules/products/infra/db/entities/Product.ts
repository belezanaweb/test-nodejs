export default interface Product {
  sku: number,
  name: string,
  inventory: {
    quantity: number,
    warehouses: {
      locality: string,
      quantity: number,
      type: "ECOMMERCE" | "PHYSICAL_STORE"
    }[]
  }
  isMarketable?: Boolean
}
