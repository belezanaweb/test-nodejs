import Product from "src/domain/entities/Product";
import Inventory from "src/domain/entities/Inventory";
import Warehouse, { WarehouseType } from "src/domain/entities/Warehouse";

describe("Product", () => {
  let inventory: Inventory;
  let warehouse1: Warehouse;
  let warehouse2: Warehouse;
  let product: Product;

  beforeEach(() => {
    warehouse1 = new Warehouse({ locality: "SP", quantity: 10, type: WarehouseType.physicalStore });
    warehouse2 = new Warehouse({ locality: "RJ", quantity: 5, type: WarehouseType.ecommerce });
    inventory = new Inventory({ warehouses: [warehouse1, warehouse2] });
    product = new Product({ sku: 1, name: "Test Product", inventory });
  });

  describe("getSku", () => {
    it("should return the product's sku", () => {
      expect(product.getSku()).toEqual(1);
    });
  });

  describe("getName", () => {
    it("should return the product's name", () => {
      expect(product.getName()).toEqual("Test Product");
    });
  });

  describe("getInventory", () => {
    it("should return the product's inventory", () => {
      expect(product.getInventory()).toEqual(inventory);
    });
  });

  describe("getIsMarketable", () => {
    it("should return true if the product has enough quantity to be marketable", () => {
      expect(product.getIsMarketable()).toEqual(true);
    });

    it("should return false if the product does not have enough quantity to be marketable", () => {
      warehouse1 = new Warehouse({ locality: "SP", quantity: 0, type: WarehouseType.physicalStore });
      warehouse2 = new Warehouse({ locality: "RJ", quantity: 0, type: WarehouseType.ecommerce });
      inventory = new Inventory({ warehouses: [warehouse1, warehouse2] });
      product = new Product({ sku: 1, name: "Test Product", inventory });
      expect(product.getIsMarketable()).toEqual(false);
    });
  });
});
