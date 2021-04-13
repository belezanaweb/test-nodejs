// enum TypeWarehouse {
//   ECOMMERCE = "ECOMMERCE",
//   PHYSICAL_STORE = "PHYSICAL_STORE",
// }

export let productsOutput = [
  {
    sku: 43264,
    name:
      "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    inventory: {
      quantity: 15,
      warehouses: [
        {
          locality: "SP",
          quantity: 12,
          type: "ECOMMERCE",
        },
        {
          locality: "MOEMA",
          quantity: 3,
          type: "PHYSICAL_STORE",
        },
      ],
    },
    isMarketable: true,
  },
];


export class Product {
  constructor(
    public readonly sku: number,
    public readonly name: string,
    public readonly inventory: Inventory,
    public readonly isMarketable?: boolean
  ) {}
}

export interface ProductInput {
  sku: number;
  name: string;
  inventory: Inventory;
}

export class Warehouses {
  constructor(
    public readonly locality: string,
    public readonly quantity: number,
    public readonly type: string
  ) {}
}

export class Inventory {
  constructor(
    public readonly warehouses: Warehouses[],
    public readonly quantity?: number
  ) {}
}


export function updateQuantity() {
  for (let product in productsOutput) {
    let totaly = 0;
    for (let inventory in productsOutput[product].inventory.warehouses) {
      totaly +=
        productsOutput[product].inventory.warehouses[inventory].quantity;
    }
    productsOutput[product].inventory.quantity = totaly;

    if (totaly > 0) {
      productsOutput[product].isMarketable = true;
    } else {
      productsOutput[product].isMarketable = false;
    }
  }
}
