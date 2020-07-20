import { ProductBusiness } from "../../src/business/ProductBusiness";
import { Product } from "../../src/model/Product";
import { InvalidParameterError } from "../../src/errors/InvalidParameterError";

describe("Testing ProductBusiness.deleteProductBySku", () => {
  let productDatabase = {};

  test("Should return 'Missing input' for empty sku", () => {
    const productBusiness = new ProductBusiness(productDatabase as any);

    expect(() => {
      productBusiness.deleteProductBySku(Number(undefined));
    }).toThrowError(new InvalidParameterError("Missing input"));
  });

  test("Checking if deleteProductBySku has been called", () => {
    const deleteProductBySku = jest.fn((sku: number) => {});
    productDatabase = { deleteProductBySku };

    const productBusiness = new ProductBusiness(productDatabase as any);

    productBusiness.deleteProductBySku(123);

    expect(deleteProductBySku).toHaveBeenCalledWith(123);
  });
});
