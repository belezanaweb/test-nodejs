export default interface Warehouse {
  locality: string,
  quantity: number,
  type: 'ECOMMERCE' | 'PHYSICAL_STORE'
}
