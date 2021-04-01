import ProductController from "../modules/products/controller/ProductController";

describe("Testar CRUD de produtos", () => {
  test("Deve criar um produto", () => {
    try {
      const productController = new ProductController();

      const warehouses = [
        {
          locality: "SC",
          quantity: 15,
          type: "ECOMMERCE",
        },
      ];

      const inventory = {
        warehouses,
      };

      productController.create(
        12345,
        "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory
      );

      expect(productController.create).toHaveBeenCalledWith(43265);
      expect(productController.create).toHaveBeenCalledWith(
        "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g"
      );
    } catch (error) {
      expect(error.errorCode).toBeUndefined();
    }
  });

  test("Deve deletar um produto", () => {
    try {
      const findBySku = jest.fn((sku) => null);

      const productController = new ProductController();

      const sku = 12345;

      productController.remove(sku);

      expect(findBySku).toBe(12345);
      expect(sku).toBe(12345);
    } catch (error) {
      expect(error.errorCode).toBeUndefined();
    }
  });

  test("Deve pesquisar um produto com base no SKU", () => {
    try {
      const findBySku = jest.fn((sku) => null);

      const productController = new ProductController();

      const sku = 43265;

      productController.fetch(sku);

      expect(findBySku).toBe(43265);
      expect(sku).toBe(43265);
    } catch (error) {
      expect(error.errorCode).toBeUndefined();
    }
  });

});
