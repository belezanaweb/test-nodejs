import Warehouse, { WarehouseType } from "src/domain/entities/Warehouse";

describe("Warehouse", () => {
  describe("constructor", () => {
    it("should create a warehouse with the provided parameters", () => {
      const warehouse = new Warehouse({ locality: "Miami", quantity: 100, type: WarehouseType.physicalStore });
      expect(warehouse).toBeDefined();
      expect(warehouse.getLocality()).toBe("Miami");
      expect(warehouse.getQuantity()).toBe(100);
      expect(warehouse.getType()).toBe(WarehouseType.physicalStore);
    });
  });

  describe("getLocality", () => {
    it("should return the locality of the warehouse", () => {
      const warehouse = new Warehouse({ locality: "Los Angeles", quantity: 50, type: WarehouseType.ecommerce });
      expect(warehouse.getLocality()).toBe("Los Angeles");
    });
  });

  describe("getQuantity", () => {
    it("should return the quantity of the warehouse", () => {
      const warehouse = new Warehouse({ locality: "Seattle", quantity: 200, type: WarehouseType.physicalStore });
      expect(warehouse.getQuantity()).toBe(200);
    });
  });

  describe("getType", () => {
    it("should return the type of the warehouse", () => {
      const warehouse = new Warehouse({ locality: "New York", quantity: 150, type: WarehouseType.ecommerce });
      expect(warehouse.getType()).toBe(WarehouseType.ecommerce);
    });
  });
});
