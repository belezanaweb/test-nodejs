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
      
        const product = new Product({ productData.sku, productData.name });

    expect(product).toBeInstanceOf(Product);
    expect(product.sku).toEqual(productData.sku);
    expect(product.name).toBe(productData.name);
    expect(product.inventory).toEqual(productData.inventory);
  });  
});
