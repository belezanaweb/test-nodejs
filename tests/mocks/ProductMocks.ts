export const productToCreateMock = {
  sku: 12345,
  name: "Coca-cola",
  inventory: {
    warehouses: [
      {
        locality: "MOEMA",
        quantity: 3,
        type: "PHYSICAL_STORE"
      }
    ]
  }
}

export const productToGetMock = {
  productId: "0162ba3a-8e9d-4d84-aecf-63ec8f161909",
  sku: 8516,
  name: "Sabonete",
}

export const productToDeleteMock = {
  productId: "0162ba3a-8e9d-4d84-aecf-63ec8f161909",
  sku: 8516,
  name: "Sabonete",
}

export const productMock = {
  sku: 8516,
  name: "Sabonete",
  inventory: {
    quantity: 15,
    warehouses: [
      {
        locality: "SP",
        quantity: 12,
        type: "ECOMMERCE"
      },
      {
        locality: "MOEMA",
        quantity: 3,
        type: "PHYSICAL_STORE"
      }
    ]
  },
  isMarketable: true,
}


export const productToUpdateMock = {
  sku: 8516,
  name: "Sabonete dove",
  inventory: {
    warehouses: [
      {
        locality: "SP",
        quantity: 12,
        type: "ECOMMERCE"
      },
      {
        locality: "MOEMA",
        quantity: 3,
        type: "PHYSICAL_STORE"
      }
    ]
  }
}

export const createdProductMock = {
  productId: "0162ba3a-8e9d-4d84-aecf-63ec8f161909",
  sku: 8516,
  name: "Sabonete",
  inventory: {
    inventoryId: "9b57c638-203c-4328-b90a-0c341b98b8d2",
    warehouses: [
      {
        warehouseId: "f8fe6f44-d509-477f-b315-216ba16650a2",
        locality: "SP",
        quantity: 12,
        type: "ECOMMERCE"
      },
      {
        warehouseId: "f39bc162-e105-4b13-8d34-1e48bc0bc9c4",
        locality: "MOEMA",
        quantity: 3,
        type: "PHYSICAL_STORE"
      }
    ]
  },
}
