import supertest from "supertest";
import app from "../index";

describe("testing routes", () => {
  it("GET / route it's working!", async () => {
    const response = await supertest(app).get("/");

    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual("It's working!");
  });

  it("GET /test resource not found!", async () => {
    const response = await supertest(app).get("/test");

    expect(response.statusCode).toEqual(404);
    expect(response.text).toEqual("Resource not found");
  });

  it("GET /api/belezanaweb/products/", async () => {
    const response = await supertest(app).get("/");

    expect(response.statusCode).toEqual(200);
  });

  it("GET /api/belezanaweb/products/43264", async () => {
    const response = await supertest(app).get(
      "/api/belezanaweb/products/43264"
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual(
      "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g"
    );
    expect(response.body.inventory.quantity).toEqual(15);
    expect(response.body.isMarketable).toEqual(true);
  });

  it("POST /api/belezanaweb/products/", async () => {
    const response = await supertest(app)
      .post("/api/belezanaweb/products/")
      .send({
        sku: 43269,
        name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
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
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toEqual(201);
    expect(response.body.sku).toEqual(43269);
    expect(response.body.name).toEqual(
      "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g"
    );
    expect(response.body.inventory.warehouses).toHaveLength(2);
    expect(response.body.inventory.warehouses[0].locality).toEqual("SP");
    expect(response.body.inventory.warehouses[1].quantity).toEqual(3);
    expect(response.body.inventory.warehouses[1].type).toEqual(
      "PHYSICAL_STORE"
    );
  });

  it("POST /api/belezanaweb/products/ product already exists", async () => {
    const response = await supertest(app)
      .post("/api/belezanaweb/products/")
      .send({
        sku: 43269,
        name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
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
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toEqual(422);
    expect(response.text).toEqual("Product already exists");
  });

  it("PUT /api/belezanaweb/products/43269 product update and checking the quantity and isMarketable properties. ", async () => {
    const response = await supertest(app)
      .put("/api/belezanaweb/products/43269")
      .send({
        sku: 43269,
        name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory: {
          warehouses: [
            {
              locality: "SP",
              quantity: 0,
              type: "ECOMMERCE",
            },
            {
              locality: "MOEMA",
              quantity: 0,
              type: "PHYSICAL_STORE",
            },
          ],
        },
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toEqual(200);
    expect(response.body.sku).toEqual(43269);
    expect(response.body.name).toEqual(
      "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g"
    );
    expect(response.body.inventory.warehouses).toHaveLength(2);
    expect(response.body.inventory.warehouses[0].quantity).toEqual(0);
    expect(response.body.inventory.warehouses[1].quantity).toEqual(0);
    expect(response.body.inventory.quantity).toEqual(0);
    expect(response.body.isMarketable).toEqual(false);
  });

  it("DELETE /api/belezanaweb/products/43269", async () => {
    const response = await supertest(app).delete(
      "/api/belezanaweb/products/43269"
    );

    expect(response.statusCode).toEqual(204);

    const res = await supertest(app).get("/api/belezanaweb/products/43269");

    expect(res.text).toEqual("Product not found");
  });
});
