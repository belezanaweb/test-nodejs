import Inventory from "src/domain/entities/Inventory";
import Warehouse, { WarehouseType } from "src/domain/entities/Warehouse";

describe("[Entities] Inventory", () => {
  const warehouses = [
    new Warehouse({ locality: "SP", type: WarehouseType.ecommerce, quantity: 10 }),
    new Warehouse({ locality: "MOEMA", type: WarehouseType.physicalStore, quantity: 5 }),
    new Warehouse({ locality: "TAUBATÉ", type: WarehouseType.ecommerce, quantity: 3 }),
  ];

  const inventory = new Inventory({ warehouses });

  it("should return the correct warehouses", () => {
    expect(inventory.getWarehouses()).toEqual(warehouses);
  });

  it("should return the correct quantity", () => {
    expect(inventory.getQuantity()).toBe(18);
  });

  it("should return 0 quantity if there are no warehouses", () => {
    const emptyInventory = new Inventory({ warehouses: [] });
    expect(emptyInventory.getQuantity()).toBe(0);
  });
});
