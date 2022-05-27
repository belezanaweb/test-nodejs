interface warehouse {
    locality: string,
    quantity: number,
    type: string,
  }
  
  interface inventory {
    quantity?: number,    
    warehouses: Array<warehouse>
  }
  
  interface Request {
    sku: number;
    name: string;  
    inventory: inventory;
    isMarketable?: boolean;
  }
  
  interface RequestUpdate {
    name: string;  
    inventory: inventory;
    isMarketable?: boolean;
  }

  export { warehouse, inventory, Request, RequestUpdate }