const { Product } = require("./productModel");

const products = [
  {
    sku: 43264,
    name:
      "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
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
  },
  {
    sku: 13325,
    name: "Océane Multicolor Powder Ultra Glam - Pó 3 em 1 9,5g",
    inventory: {
      warehouses: []
    }
  }
];

const populateProducts = done => {
  Product.remove({})
    .then(() => {
      return Product.insertMany(products);
    })
    .then(() => done());
};

module.exports = { products, populateProducts };
