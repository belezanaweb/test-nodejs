import Products from "@modules/products/Products.entity";

export const ProductMock: Products = {
  sku: "123123",
  name: "Teste",
  inventory: {
    warehouses: [
      {
        locality: "Gotham",
        quantity: 100,
        type: "Batman",
      },
      {
        locality: "Metropolis",
        quantity: 10,
        type: "Superman",
      },
    ],
  },
};
