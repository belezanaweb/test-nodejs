import { ProductBusiness } from "../../src/business/ProductBusiness";
import { Product } from "../../src/model/Product";
import { InvalidParameterError } from "../../src/errors/InvalidParameterError";

describe("Testing ProductBusiness.getProductBySku", () => {
  let productDatabase = {};

  test("Should return 'Missing input' for empty sku", () => {
    const productBusiness = new ProductBusiness(productDatabase as any);

    expect(() => {
      productBusiness.getProductBySku(Number(undefined));
    }).toThrowError(new InvalidParameterError("Missing input"));
  });

  test("Checking if getProductBySku has been called", () => {
    const getProductBySku = jest.fn((sku: number) => {});
    productDatabase = { getProductBySku };

    const productBusiness = new ProductBusiness(productDatabase as any);

    productBusiness.getProductBySku(123);

    expect(getProductBySku).toHaveBeenCalledWith(123);
  });
});
