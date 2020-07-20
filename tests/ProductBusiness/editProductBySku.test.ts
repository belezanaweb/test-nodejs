import { ProductBusiness } from "../../src/business/ProductBusiness";
import { Product } from "../../src/model/Product";
import { Inventory } from "../../src/model/Inventory";
import { Warehouse } from "../../src/model/Warehouse";
import { InvalidParameterError } from "../../src/errors/InvalidParameterError";

describe("Testing ProductBusiness.editProductBySku", () => {
  let productDatabase = {};

  test("Should return 'Missing input' for empty sku", () => {
    const mockWarehouse = new Warehouse("Moema", 3, "ECOMMERCE");
    const mockInventory = new Inventory([mockWarehouse]);
    const mockProduct = new Product(
      123,
      "L'Oréal Professionnel",
      mockInventory
    );

    const productBusiness = new ProductBusiness(productDatabase as any);

    expect(() => {
      productBusiness.editProductBySku(Number(undefined), mockProduct);
    }).toThrowError(new InvalidParameterError("Missing input"));
  });

  test("Should return 'Missing input' for empty product", () => {
    const productBusiness = new ProductBusiness(productDatabase as any);

    expect(() => {
      productBusiness.editProductBySku(Number(undefined), undefined!);
    }).toThrowError(new InvalidParameterError("Missing input"));
  });

  test("Checking if editProductBySku has been called", () => {
    const mockWarehouse = new Warehouse("Moema", 3, "ECOMMERCE");
    const mockInventory = new Inventory([mockWarehouse]);
    const mockProduct = new Product(
      123,
      "L'Oréal Professionnel",
      mockInventory
    );

    const editProductBySku = jest.fn((sku: number, product: Product) => {});
    productDatabase = { editProductBySku };

    const productBusiness = new ProductBusiness(productDatabase as any);

    productBusiness.editProductBySku(123, mockProduct);

    expect(editProductBySku).toHaveBeenCalled();
  });
});
