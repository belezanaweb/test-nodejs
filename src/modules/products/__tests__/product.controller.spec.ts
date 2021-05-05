import request from "supertest";

import { app } from "../../../app";
import Products from "../Products.entity";
import { ProductMock } from "./mocks/product.mock";

describe("ProductController", () => {
  const entityName = "products";

  describe("Create", () => {
    it("Should be create", async () => {
      const response = await request(app)
        .post(`/${entityName}`)
        .send(ProductMock);

      expect(response.body).toMatchObject(ProductMock);
    });

    it("It return error when create", async () => {
      const response = await request(app)
        .post(`/${entityName}`)
        .send({ name: ProductMock.name, inventory: ProductMock.inventory });

      expect(response.body).toMatchObject({
        message: [{ msg: "sku invalido", param: "sku", location: "body" }],
      });
    });

    it("Should be conflict when create product", async () => {
      const response = await request(app)
        .post(`/${entityName}`)
        .send(ProductMock);

      expect(response.status).toEqual(409);
    });
  });

  describe("Search", () => {
    it("Should be get all products", async () => {
      const response = await request(app).get(`/${entityName}`);

      expect(response.body).toMatchObject([ProductMock]);
    });

    it("Should be get one product", async () => {
      const response = await request(app).get(
        `/${entityName}/${ProductMock.sku}`
      );

      const sum = ProductMock.inventory.warehouses.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);

      expect(response.body).toMatchObject({
        ...ProductMock,
        inventory: {
          ...ProductMock.inventory,
          quantity: sum,
        },
        isMarketable: !!sum,
      });
    });

    it("Should be get not find product", async () => {
      const response = await request(app).get(`/${entityName}/666`);
      expect(response.status).toEqual(404);
    });
  });

  describe("Update", () => {
    it("Should be update a product", async () => {
      const putData = {
        ...ProductMock,
        name: "update",
      };

      const response = await request(app)
        .put(`/${entityName}/${ProductMock.sku}`)
        .send(putData);

      expect(response.body).toMatchObject(putData);
    });

    it("Should be get not find product", async () => {
      const response = await request(app)
        .put(`/${entityName}/999`)
        .send(ProductMock);

      expect(response.status).toEqual(404);
    });
  });

  describe("Delete", () => {
    it("Should be update a product", async () => {
      const response = await request(app).delete(
        `/${entityName}/${ProductMock.sku}`
      );

      expect(response.status).toBe(204);
    });

    it("Should be get not find product", async () => {
      const response = await request(app).delete(`/${entityName}/666`);
      expect(response.status).toEqual(404);
    });
  });
});
