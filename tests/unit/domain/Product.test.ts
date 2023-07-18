import Product from "../../../src/domain/Product";

describe("Product", () => {
  it("should create a new product instance", () => {
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

    const { sku, name, inventory } = productData;
    const product = new Product(sku, name, inventory as any);

    expect(product).toBeInstanceOf(Product);
    expect(product.sku).toEqual(productData.sku);
    expect(product.name).toBe(productData.name);
    expect(product.inventory).toEqual(productData.inventory);
  });
});
