import request from "supertest";
import app from "../../../src/app";
import * as mocks from "./mocks/products-mock";
import * as business from "../../../src/business/product";

describe("/api/v1/product endpoint fail test", () => {
  test("[POST] should return 400 when try create a product with inventory quantity", async () => {
    const res = await request(app)
      .post("/api/v1/products")
      .send(mocks.productWithQuantity);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeTruthy();
  });

  test("[POST] should return 500 when try create a product", async () => {
    jest.spyOn(business, "createBusiness").mockRejectedValue(new Error("Erro test"))


    const res = await request(app)
      .post("/api/v1/products")
      .send(mocks.productOne);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message", "Erro test");
  });

  test("[GET] should return 400 when get product by id with wrong value", async () => {
    const res = await request(app).get("/api/v1/products/aaaa");

    expect(res.statusCode).toEqual(400);
  })

  test("[GET] should return 500 when try to get all products", async () => {
    jest.spyOn(business, "findAll").mockRejectedValue(new Error("Erro test"))


    const res = await request(app)
      .get("/api/v1/products")

    expect(res.statusCode).toEqual(500);
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message", "Erro test");
  });

  test("[GET] should return 500 when try to get product by sku", async () => {
    jest.spyOn(business, "findBySku").mockRejectedValue(new Error("Erro test"))


    const res = await request(app)
      .get("/api/v1/products/784")

    expect(res.statusCode).toEqual(500);
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message", "Erro test");
  });

  test("[PUT] should return 500 when try to update a product by sku", async () => {
    jest.spyOn(business, "update").mockRejectedValue(new Error("Erro test"))


    const res = await request(app)
      .put("/api/v1/products/784").send({name: "Malbec",
      inventory: {
        warehouses: [
          {
            locality: "SP",
            quantity: 10,
            type: "ECOMMERCE",
          },
          {
            locality: "FRANCA",
            quantity: 15,
            type: "PHYSICAL_STORE",
          },
        ],
      },})

    expect(res.statusCode).toEqual(500);
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message", "Erro test");
  });

  test("[DELETE] should return 500 when try to remove product by sku", async () => {
    jest.spyOn(business, "remove").mockRejectedValue(new Error("Erro test"))


    const res = await request(app)
      .delete("/api/v1/products/784")

    expect(res.statusCode).toEqual(500);
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message", "Erro test");
  });
});
