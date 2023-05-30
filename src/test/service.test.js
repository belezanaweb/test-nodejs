const service = require('../services/index.js')

const mockProduct =  {
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
  "isMarketable": true
};

const mockBody =  {
  "sku": 43264,
  "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
  "inventory": {
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
  }
};

const mockSku = 43264;



test('should get products with successful', () => {
  expect(service.getProductBySku(mockSku)).toStrictEqual(mockProduct);
});

test('should deleted product with successful', () => {
  expect(service.deleteProductBySku(1)).toStrictEqual(true);
});


test('should update product with successful', () => {
  const result = service.updateProductBySku(mockBody);

  expect(service.updateProductBySku(mockBody)).toStrictEqual(true);
});

