export interface ProductResquestData {
  sku: number;
  name: string;
  inventory: InventoryResquestData;
}

interface InventoryResquestData {
  warehouses: WarehouesesResquestData[];
}

interface WarehouesesResquestData {
  locality: string;
  quantity: number;
  type: string;
}
