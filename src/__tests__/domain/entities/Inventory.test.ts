import Inventory from "src/domain/entities/Inventory";
import Warehouse, { WarehouseType } from "src/domain/entities/Warehouse";

describe("Inventory", () => {
  let inventory: Inventory;

  beforeEach(() => {
    const warehouses = [
      new Warehouse({ locality: "SP", quantity: 10, type: WarehouseType.ecommerce }),
      new Warehouse({ locality: "RJ", quantity: 20, type: WarehouseType.physicalStore })
    ];
    inventory = new Inventory({ warehouses });
  });

  describe("getQuantity", () => {
    it("should return the sum of the quantity of all warehouses", () => {
      expect(inventory.getQuantity()).toBe(30);
    });
  });

  describe("getWarehouses", () => {
    it("should return the list of warehouses passed to the constructor", () => {
      expect(inventory.getWarehouses()).toHaveLength(2);
      expect(inventory.getWarehouses()[0]).toBeInstanceOf(Warehouse);
      expect(inventory.getWarehouses()[1]).toBeInstanceOf(Warehouse);
    });
  });
});
