import { ProductAttributes } from './../models/product'

const itemCreate: ProductAttributes = {
  "sku": 43264,
  "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
  "inventory": {
      "quantity": 15,
      "warehouses": [
          {
              "locality": "SP",
              "quantity": 12,
              "type": "ECOMMERCE"
          },
          {
              "locality": "MOEMA",
              "quantity": 3,
              "type": "PHYSICAL_STORE"
          }
      ]
  },
}
const item = {
  id: 1,
  ...itemCreate,
  isMarketable: true,
}
item.inventory.quantity = 15

export {
  itemCreate, item
}
