import Inventory from "src/domain/entities/Inventory";
import Product from "src/domain/entities/Product";

describe("[Entities] Product", () => {
  const inventory = new Inventory({ warehouses: [] });
  const product = new Product({ sku: "123", name: "Test Product", inventory });

  it("should return the correct SKU", () => {
    expect(product.getSku()).toBe("123");
  });

  it("should return the correct name", () => {
    expect(product.getName()).toBe("Test Product");
  });

  it("should return the correct inventory", () => {
    expect(product.getInventory()).toBe(inventory);
  });

  describe("getIsMarketable", () => {
    it("should return false if quantity is 0", () => {
      jest.spyOn(inventory, "getQuantity").mockReturnValueOnce(0);
      expect(product.getIsMarketable()).toBe(false);
    });

    it("should return true if quantity is greater than 0", () => {
      jest.spyOn(inventory, "getQuantity").mockReturnValueOnce(1);
      expect(product.getIsMarketable()).toBe(true);
    });
  });
});
