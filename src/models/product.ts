import { inventory } from '../interfaces/global.interfaces';

class Product {
    sku: number;  
    name: string;  
    inventory: inventory;
    isMarketable?: boolean;
    
    constructor({ sku, name, inventory, isMarketable }: Product ) {
      this.sku = sku;
      this.name = name;
      this.inventory = inventory;
      this.isMarketable = isMarketable;
    }
  }
  
  export default Product;
  