class Product {
  
  private sku : number;
  private name: string;
  private inventory: {
    quantity: number,
    warehouses: any
  };
  private isMarketable: boolean;

  setSku(sku?: number) {
    return this.sku = sku;
  }

  setName(name?: string) {
    return this.name = name;
  }

  setInventory(inventory?: any) {
      return this.inventory = inventory;
  }

  getSku() {
    return this.sku;
  }

  getName() {
    return this.name;
  }

  getInventory() {
      return this.inventory;
  }
}

export default new Product;