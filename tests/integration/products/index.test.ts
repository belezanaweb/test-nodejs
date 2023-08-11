import request from "supertest";
import app from "../../../src/app";
import * as mocks from "./mocks/products-mock";

describe("/api/v1/product endpoint", () => {
  test("[POST] should return 201 when product was created with success", async () => {
    const res = await request(app)
      .post("/api/v1/products")
      .send(mocks.productOne);
    expect(res.statusCode).toEqual(201);

    expect(res.body).toBeTruthy();
    expect(res.body).toBe(43264);
  });

  test("[POST] should return 201 when another product was created with success", async () => {
    const res = await request(app)
      .post("/api/v1/products")
      .send(mocks.productTwo);
    expect(res.statusCode).toEqual(201);

    expect(res.body).toBeTruthy();
    expect(res.body).toBe(43562);
  });

  test("[POST] should return 201 when another product was created with success", async () => {
    const res = await request(app)
      .post("/api/v1/products")
      .send(mocks.productThree);
    expect(res.statusCode).toEqual(201);

    expect(res.body).toBeTruthy();
    expect(res.body).toBe(44985);
  });

  test("[POST] should return 201 when another product was created with success", async () => {
    const res = await request(app)
      .post("/api/v1/products")
      .send(mocks.productFour);
    expect(res.statusCode).toEqual(201);

    expect(res.body).toBeTruthy();
    expect(res.body).toBe(44989);
  });

  test("[POST] should return 409 when product was created already exists", async () => {
    const res = await request(app)
      .post("/api/v1/products")
      .send(mocks.productOne);
    expect(res.statusCode).toEqual(409);

    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message", "Product already exists");
  });

  test("[GET] should return 200 when products exists", async () => {
    const res = await request(app).get("/api/v1/products");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toBeTruthy();
    expect(res.body).toHaveLength(4);
    expect(res.body[0]).toHaveProperty("sku", 43264);
    expect(res.body[0]).toHaveProperty(
      "name",
      "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g"
    );
    expect(res.body[0]).toHaveProperty("inventory");
    expect(res.body[0].inventory).toHaveProperty("quantity", 15);
    expect(res.body[0].inventory).toHaveProperty("warehouses");
    expect(res.body[0].inventory.warehouses[0]).toHaveProperty(
      "locality",
      "SP"
    );
    expect(res.body[0].inventory.warehouses[0]).toHaveProperty("quantity", 12);
    expect(res.body[0].inventory.warehouses[0]).toHaveProperty(
      "type",
      "ECOMMERCE"
    );
    expect(res.body[0].inventory.warehouses[1]).toHaveProperty(
      "locality",
      "MOEMA"
    );
    expect(res.body[0].inventory.warehouses[1]).toHaveProperty("quantity", 3);
    expect(res.body[0].inventory.warehouses[1]).toHaveProperty(
      "type",
      "PHYSICAL_STORE"
    );
    expect(res.body[0]).toHaveProperty("isMarketable", true);
  });

  test("[GET] should return 200 when get product by id and isMarketable is false", async () => {
    const res = await request(app).get("/api/v1/products/44989");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("sku", 44989);
    expect(res.body).toHaveProperty("name", "Produto Teste");
    expect(res.body).toHaveProperty("inventory");
    expect(res.body.inventory).toHaveProperty("quantity", 0);
    expect(res.body.inventory).toHaveProperty("warehouses");
    expect(res.body.inventory.warehouses[0]).toHaveProperty("locality", "SP");
    expect(res.body.inventory.warehouses[0]).toHaveProperty("quantity", 0);
    expect(res.body.inventory.warehouses[0]).toHaveProperty(
      "type",
      "ECOMMERCE"
    );

    expect(res.body.inventory.warehouses[1]).toHaveProperty(
      "locality",
      "MOEMA"
    );
    expect(res.body.inventory.warehouses[1]).toHaveProperty("quantity", 0);
    expect(res.body.inventory.warehouses[1]).toHaveProperty(
      "type",
      "PHYSICAL_STORE"
    );
    expect(res.body.inventory.warehouses[2]).toHaveProperty(
      "locality",
      "FRANCA"
    );
    expect(res.body.inventory.warehouses[2]).toHaveProperty("quantity", 0);
    expect(res.body.inventory.warehouses[2]).toHaveProperty(
      "type",
      "PHYSICAL_STORE"
    );
    expect(res.body).toHaveProperty("isMarketable", false);
  });

  test("[GET] should return 404 when get product by id not found", async () => {
    const res = await request(app).get("/api/v1/products/9999");
    expect(res.statusCode).toEqual(404);

    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message", "Product not found");
  });

  test("[PUT] should return 200 when update product with success", async () => {
    const res = await request(app)
      .put("/api/v1/products/43562")
      .send({
        name: "Malbec",
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
        },
      });

    expect(res.statusCode).toEqual(200);

    expect(res.body).toBeTruthy();
    expect(res.body.inventory.warehouses[0]).toHaveProperty("locality", "SP");
    expect(res.body.inventory.warehouses[0]).toHaveProperty("quantity", 10);
    expect(res.body.inventory.warehouses[0]).toHaveProperty(
      "type",
      "ECOMMERCE"
    );

    expect(res.body.inventory.warehouses[1]).toHaveProperty(
      "locality",
      "FRANCA"
    );
    expect(res.body.inventory.warehouses[1]).toHaveProperty("quantity", 15);
    expect(res.body.inventory.warehouses[1]).toHaveProperty(
      "type",
      "PHYSICAL_STORE"
    );
  });

  test("[PUT] should return 404 when product sku not found", async () => {
    const res = await request(app)
      .put("/api/v1/products/9999")
      .send({
        name: "Malbec",
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
        },
      });
    expect(res.statusCode).toEqual(404);

    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message", "Product not found");
  });

  test("[DELETE] should return 200 when product was removed with success", async () => {
    const res = await request(app).delete("/api/v1/products/43562");
    expect(res.statusCode).toEqual(204);

    expect.not.objectContaining(res.body);
  });

  test("[DELETE] should return 404 when product sku not found", async () => {
    const res = await request(app).delete("/api/v1/products/9999");
    expect(res.statusCode).toEqual(404);

    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message", "Product not found");
  });
});
