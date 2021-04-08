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
  describe("UPDATE PRODUCT - SUCCESS CASES", () => {
    afterAll(async () => {
      await deleteProductsToTests();
    });
    beforeAll(async () => {
      await createProductToTests();
    });
    it("SUCCESS - PUT - Path: /products/productSku - Should update a product", async () => {
      const productData = {
        name: "L'Oreal TESTE 500g",
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
        .put(`${PATHS.PRODUCTS.update}/${sku}`)
        .send(productData);
      expect(res.status).toEqual(HTTP_STATUS_CODE.NO_CONTENT);
    });

    it("SUCCESS - PUT - Path: /products/productSku - Should update a product without name key", async () => {
      const productData = {
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
        .put(`${PATHS.PRODUCTS.update}/${sku}`)
        .send(productData);
      expect(res.status).toEqual(HTTP_STATUS_CODE.NO_CONTENT);
    });

    it("SUCCESS - PUT - Path: /products/productSku - Should update a product without inventory key", async () => {
      const productData = {
        name: "Lor teste",
      };
      const res = await request(app)
        .put(`${PATHS.PRODUCTS.update}/${sku}`)
        .send(productData);
      expect(res.status).toEqual(HTTP_STATUS_CODE.NO_CONTENT);
    });
  });

  describe("UPDATE PRODUCT - FAIL INPUT VALIDATION CASES", () => {
    afterAll(async () => {
      await deleteProductsToTests();
    });
    it("FAIL - PUT - Path: /products/productSku - Should not update a product with not allowed sku key", async () => {
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
        .put(`${PATHS.PRODUCTS.update}/${sku}`)
        .send(productData);
      expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
    });

    it("FAIL - PUT - Path: /products/productSku - Should not update a product with empty name", async () => {
      const productData = {
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
        .put(`${PATHS.PRODUCTS.update}/${sku}`)
        .send(productData);
      expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
    });

    it("FAIL - PUT - Path: /products/productSku - Should not update a product with empty inventory.warehouses[0].locality", async () => {
      const productData = {
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
        .put(`${PATHS.PRODUCTS.update}/${sku}`)
        .send(productData);
      expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
    });

    it("FAIL - PUT - Path: /products/productSku - Should not update a product with negative inventory.warehouses[0].quantity", async () => {
      const productData = {
        name:
          "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory: {
          warehouses: [
            {
              locality: "",
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
        .put(`${PATHS.PRODUCTS.update}/${sku}`)
        .send(productData);
      expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
    });

    it("FAIL - PUT - Path: /products/productSku - Should not update a product with negative inventory.warehouses[0].type", async () => {
      const productData = {
        name:
          "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory: {
          warehouses: [
            {
              locality: "",
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
        .put(`${PATHS.PRODUCTS.update}/${sku}`)
        .send(productData);
      expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
    });

    it("FAIL - PUT - Path: /products/productSku - Should not update a product without inventory.warehouses[0].type", async () => {
      const productData = {
        name:
          "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory: {
          warehouses: [
            {
              locality: "",
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
        .put(`${PATHS.PRODUCTS.update}/${sku}`)
        .send(productData);
      expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
    });

    it("FAIL - PUT - Path: /products/productSku - Should not update a product without inventory.warehouses[0].locality", async () => {
      const productData = {
        name:
          "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory: {
          warehouses: [
            {
              quantity: 12,
              type: "EXAMPLE",
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
        .put(`${PATHS.PRODUCTS.update}/${sku}`)
        .send(productData);
      expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
    });

    it("FAIL - PUT - Path: /products/productSku - Should not update a product without inventory.warehouses[0].quantity", async () => {
      const productData = {
        name:
          "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory: {
          warehouses: [
            {
              locality: "MOEMA",
              type: "EXAMPLE",
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
        .put(`${PATHS.PRODUCTS.update}/${sku}`)
        .send(productData);
      expect(res.status).toEqual(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY);
    });
  });

  describe("UPDATE PRODUCT - FAIL INPUT DATABASE VALIDATION CASES", () => {
    afterAll(async () => {
      await deleteProductsToTests();
    });
    it("FAIL - PUT - Path: /products/productSku - Should not update a product with not allowed sku key", async () => {
      const productData = {
        name: "teste",
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
        .put(`${PATHS.PRODUCTS.update}/${sku}`)
        .send(productData);
      expect(res.status).toEqual(HTTP_STATUS_CODE.NOT_FOUND);
    });
  });
});
