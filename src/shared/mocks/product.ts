const mockProduct = {
  BODY_REQUEST: {
    product_1: {
      sku: 1,
      name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
      inventory: {
        warehouses: [
          {
            locality: 'SP',
            quantity: 12,
            type: 'ECOMMERCE',
          },
          {
            locality: 'MOEMA',
            quantity: 3,
            type: 'PHYSICAL_STORE',
          },
        ],
      },
    },
    product_2: {
      sku: 2,
      name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
      inventory: {
        warehouses: [
          {
            locality: 'SP',
            quantity: 12,
            type: 'ECOMMERCE',
          },
          {
            locality: 'MOEMA',
            quantity: 3,
            type: 'PHYSICAL_STORE',
          },
        ],
      },
    },
  },
  DATA_RESPONSE: {
    product_1: {
      sku: 1,
      name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
      inventory: {
        quantity: 15,
        warehouses: [
          {
            locality: 'SP',
            quantity: 12,
            type: 'ECOMMERCE',
          },
          {
            locality: 'MOEMA',
            quantity: 3,
            type: 'PHYSICAL_STORE',
          },
        ],
      },
      isMarketable: true,
    },
    product_2: {
      sku: 2,
      name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
      inventory: {
        warehouses: [
          {
            locality: 'SP',
            quantity: 12,
            type: 'ECOMMERCE',
          },
          {
            locality: 'MOEMA',
            quantity: 3,
            type: 'PHYSICAL_STORE',
          },
        ],
      },
    },
  },
};

export { mockProduct };
