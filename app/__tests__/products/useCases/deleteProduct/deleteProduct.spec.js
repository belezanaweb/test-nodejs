import HTTP_STATUS_CODE from "../../../../src/constants/httpStatusCode";
import PATHS from "../../../../src/constants/paths";
import request from "supertest";
import app from "../../../../src/app";
import mongoose from "mongoose";
import products from "../../../../src/infrastructure/database/models/products";
mongoose.model("products");

const sku = Math.floor(Math.random() * 990000) + 100000;

const deleteProductsToTests = async () => {
  await products.findOneAndDelete({ sku: sku });
};

const createProductToTests = async () => {
  const productExample = {
    sku: sku,
    name:
      "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    inventory: {
      warehouses: [
        {
          locality: "SP",
          quantity: 12,
          type: "ECOMMERCE",
        },
        {
          locality: "MOEMA",
          quantity: 3,
          type: "PHYSICAL_STORE",
        },
      ],
    },
  };
  const newProduct = new products(productExample);
  await newProduct.save();
};

describe(" PRODUCTS REQUESTS.", () => {
  describe("DELETE PRODUCT - SUCCESS CASES", () => {
    afterAll(async () => {
      await deleteProductsToTests();
    });
    beforeAll(async () => {
      await createProductToTests();
    });

    it("SUCCESS - DELETE - Path: /products/productSku - Should delete a product", async () => {
      const res = await request(app).delete(`${PATHS.PRODUCTS.delete}/${sku}`);
      expect(res.status).toEqual(HTTP_STATUS_CODE.ACCEPTED);
    });
  });

  describe("DELETE PRODUCT - FAIL DATA VALIDATION CASES", () => {
    afterAll(async () => {
      await deleteProductsToTests();
    });

    it("SUCCESS - DELETE - Path: /products/productSku - Should not delete a invalid product sku", async () => {
      const res = await request(app).delete(`${PATHS.PRODUCTS.delete}/${sku}`);
      expect(res.status).toEqual(HTTP_STATUS_CODE.NOT_FOUND);
    });
  });
});
