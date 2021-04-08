import HTTP_STATUS_CODE from "../../../../src/constants/httpStatusCode.js";
import PATHS from "../../../../src/constants/paths.js";
import request from "supertest";
import app from "../../../../src/app.js";
import mongoose from "mongoose";
import products from "../../../../src/infrastructure/database/models/products.js";
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
  describe("GET PRODUCT - SUCCESS CASES", () => {
    afterAll(async () => {
      await deleteProductsToTests();
    });
    beforeAll(async () => {
      await createProductToTests();
    });

    it("SUCCESS - GET - Path: /products/productSku - Should GET a product", async () => {
      const res = await request(app).get(`${PATHS.PRODUCTS.get}/${sku}`);
      expect(res.status).toEqual(HTTP_STATUS_CODE.OK);
    });

    it("SUCCESS - GET - Path: /products/productSku - Should GET a product with isMarketable true", async () => {
      const res = await request(app).get(`${PATHS.PRODUCTS.get}/${sku}`);
      expect(res.status).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body).toMatchObject({isMarketable: true})
    });

    it("SUCCESS - GET - Path: /products/productSku - Should GET a product with isMarketable true", async () => {
      const res = await request(app).get(`${PATHS.PRODUCTS.get}/${sku}`);
      expect(res.status).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body.inventory.quantity).toBeGreaterThan(0)
    });
  });

  describe("GET PRODUCT - FAIL DATA VALIDATION CASES", () => {
    afterAll(async () => {
      await deleteProductsToTests();
    });

    it("SUCCESS - GET - Path: /products/productSku - Should not GET a invalid product sku", async () => {
      const res = await request(app).get(`${PATHS.PRODUCTS.get}/${sku}`);
      expect(res.status).toEqual(HTTP_STATUS_CODE.NOT_FOUND);
    });
  });
});
