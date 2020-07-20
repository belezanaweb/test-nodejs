import { ProductBusiness } from "../../src/business/ProductBusiness";
import { Product } from "../../src/model/Product";
import { Inventory } from "../../src/model/Inventory";
import { Warehouse } from "../../src/model/Warehouse";
import { InvalidParameterError } from "../../src/errors/InvalidParameterError";

describe("Testing ProductBusiness.createProduct", () => {
  let productDatabase = {};

  test("Should return 'Missing input' for empty sku", () => {
    const productBusiness = new ProductBusiness(productDatabase as any);

    const mockWarehouse = new Warehouse("Moema", 3, "ECOMMERCE");

    const mockInventory = new Inventory([mockWarehouse]);

    expect(() => {
      productBusiness.createProduct(
        Number(""),
        "L'Oréal Professionnel",
        mockInventory
      );
    }).toThrowError(new InvalidParameterError("Missing input"));
  });

  test("Should return 'Missing input' for empty name", () => {
    const productBusiness = new ProductBusiness(productDatabase as any);

    const mockWarehouse = new Warehouse("Moema", 3, "ECOMMERCE");

    const mockInventory = new Inventory([mockWarehouse]);

    expect(() => {
      productBusiness.createProduct(Number("123"), "", mockInventory);
    }).toThrowError(new InvalidParameterError("Missing input"));
  });

  test("Should return 'Missing input' for empty inventory", () => {
    const productBusiness = new ProductBusiness(productDatabase as any);

    expect(() => {
      productBusiness.createProduct(
        Number("123"),
        "L'Oréal Professionnel",
        null!
      );
    }).toThrowError(new InvalidParameterError("Missing input"));
  });

  test("Checking if foundProduct and createProduct were called", () => {
    const mockWarehouse = new Warehouse("Moema", 3, "ECOMMERCE");
    const mockInventory = new Inventory([mockWarehouse]);
    const mockProduct = new Product(
      123,
      "L'Oréal Professionnel",
      mockInventory
    );

    const createProduct = jest.fn((product: Product) => {
      mockProduct;
    });

    const foundProduct = jest.fn((sku: number) => {});
    productDatabase = { foundProduct, createProduct };

    const productBusiness = new ProductBusiness(productDatabase as any);

    const mockSku = 123;

    productBusiness.createProduct(
      mockSku,
      "L'Oréal Professionnel",
      mockInventory
    );

    expect(foundProduct).toHaveBeenCalledWith(123);
    expect(createProduct).toHaveBeenCalledWith(mockProduct);
  });
});
