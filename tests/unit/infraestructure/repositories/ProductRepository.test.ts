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
        warehouses: [
          {
            locality: "SP",
            quantity: 5,
            type: "ECOMMERCE",
          },
        ],
      },
    };

    const prodcutToSave = new Product(
      productData.sku,
      productData.name,
      productData.inventory
    );
    await productRepository.save(prodcutToSave, true);

    const storedProduct = await productRepository.findBySku(productData.sku);
    expect(storedProduct).toEqual(prodcutToSave);
  });
});
