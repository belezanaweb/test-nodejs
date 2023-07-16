import ProductRepository from "../../../../src/infraestructure/repositories/ProductRepository";
import ProductNotFoundError from "../../../../src/errors/ProductNotFoundError";
import Product from "../../../../src/domain/Product";

describe("ProductRepository", () => {
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = new ProductRepository();
  });

  it("should save a product", async () => {
    const productData = {
      sku: 12345,
      name: "Test Product",
      inventory: {
        quantity: 5,
        warehouses: [
          {
            locality: "SP",
            quantity: 5,
            type: "ECOMMERCE",
          },
        ],
      },
    };

    await productRepository.save(productData);

    const storedProduct = await productRepository.findBySku(productData.sku);
    expect(storedProduct).toEqual(productData);
  });
});
