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
  describe("CREATE PRODUCT - SUCCESS CASES", () => {
    afterAll(async () => {
      await deleteProductsToTests();

      it("SUCCESS - POST - Path: /products - Should create a new product", async () => {
        const productData = {
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
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.CREATED);
      });
    });

    describe("CREATE PRODUCT - FAIL INPUT VALIDATION CASES", () => {
      afterAll(async () => {
        await deleteProductsToTests();
      });
      it("FAIL - POST - Path: /products - Should not create a new product without name", async () => {
        const productData = {
          sku: sku,
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
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
      });

      it("FAIL - POST - Path: /products - Should not create a new product without sku", async () => {
        const productData = {
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
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
      });

      it("FAIL - POST - Path: /products - Should not create a new product with empty name", async () => {
        const productData = {
          sku: sku,
          name: "",
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
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
      });

      it("FAIL - POST - Path: /products - Should not create a new product without invetory", async () => {
        const productData = {
          sku: sku,
          name:
            "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        };
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
      });

      it("FAIL - POST - Path: /products - Should not create a new product without inventory.warehouses", async () => {
        const productData = {
          sku: sku,
          inventory: {},
        };
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
      });

      it("FAIL - POST - Path: /products - Should not create a new product without inventory.warehouses[0].type", async () => {
        const productData = {
          name:
            "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
          inventory: {
            warehouses: [
              {
                locality: "SP",
                quantity: 12,
              },
              {
                locality: "MOEMA",
                quantity: 3,
                type: "PHYSICAL_STORE",
              },
            ],
          },
        };
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
      });

      it("FAIL - POST - Path: /products - Should not create a new product without inventory.warehouses[0].quantity", async () => {
        const productData = {
          name:
            "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
          inventory: {
            warehouses: [
              {
                locality: "SP",
                type: "PHYSICAL_STORE",
              },
              {
                locality: "MOEMA",
                quantity: 3,
                type: "PHYSICAL_STORE",
              },
            ],
          },
        };
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
      });

      it("FAIL - POST - Path: /products - Should not create a new product without inventory.warehouses[0].locality", async () => {
        const productData = {
          name:
            "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
          inventory: {
            warehouses: [
              {
                type: "PHYSICAL_STORE",
                quantity: 12,
              },
              {
                locality: "MOEMA",
                quantity: 3,
                type: "PHYSICAL_STORE",
              },
            ],
          },
        };
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
      });

      it("FAIL - POST - Path: /products - Should not create a new product with negative sku name", async () => {
        const productData = {
          sku: -1,
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
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
      });

      it("FAIL - POST - Path: /products - Should not create a new product with negative inventory.warehouses[0].quantity", async () => {
        const productData = {
          sku: sku,
          name:
            "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
          inventory: {
            warehouses: [
              {
                locality: "SP",
                quantity: -12,
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
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
      });

      it("FAIL - POST - Path: /products - Should not create a new product with empty inventory.warehouses[0].locality", async () => {
        const productData = {
          sku: sku,
          name:
            "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
          inventory: {
            warehouses: [
              {
                locality: "",
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
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
      });

      it("FAIL - POST - Path: /products - Should not create a new product with empty inventory.warehouses[0].type", async () => {
        const productData = {
          sku: sku,
          name:
            "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
          inventory: {
            warehouses: [
              {
                locality: "SP",
                quantity: 12,
                type: "",
              },
              {
                locality: "MOEMA",
                quantity: 3,
                type: "PHYSICAL_STORE",
              },
            ],
          },
        };
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
      });
    });

    describe("CREATE PRODUCT - FAIL DUPLICATE DATA CASES", () => {
      afterAll(async () => {
        await deleteProductsToTests();
      });
      beforeAll(async () => {
        await createProductToTests();
      });

      it("FAIL - POST - Path: /products - Should not create a new product that already exists in db", async () => {
        const productData = {
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
        const res = await request(app)
          .post(PATHS.PRODUCTS.create)
          .send(productData);
        expect(res.status).toEqual(HTTP_STATUS_CODE.CONFLICT);
      });
    });
  });
});
