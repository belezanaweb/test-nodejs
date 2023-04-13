import Warehouse, { WarehouseType } from "src/entities/Warehouse";

describe("[Entities] Warehouse", () => {
  const warehouse = new Warehouse({ locality: "New York", quantity: 10, type: WarehouseType.ecommerce });

  it("should return the correct locality", () => {
    expect(warehouse.getLocality()).toBe("New York");
  });

  it("should return the correct quantity", () => {
    expect(warehouse.getQuantity()).toBe(10);
  });

  it("should return the correct type", () => {
    expect(warehouse.getType()).toBe(WarehouseType.ecommerce);
  });
});
