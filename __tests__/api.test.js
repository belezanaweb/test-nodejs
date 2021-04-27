const express = require("express");
const request = require("supertest");
const app = express();
const port = 3000;

app.use(express.json());

require("../api/routes/products")(app, true);

let server = app.listen(port, () => {
  console.log(`Belezanaweb api listening at http://localhost:${port}`);
});

it("GET /api/v1/produtos - success", async () => {
  const { body } = await request(app).get("/api/v1/produtos"); //uses the request function that calls on express app instance
  expect(body).toEqual({
    items: [
      {
        sku: 43264,
        name:
          "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory: {
          quantity: 15,
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
        isMarketable: true,
      },
      {
        sku: 38273,
        name:
          "Good Girl Carolina Herrera Eau de Parfum - Perfume Feminino 30ml",
        inventory: {
          quantity: 1,
          warehouses: [
            { locality: "SP", quantity: 1, type: "ECOMMERCE" },
            { locality: "MOEMA", quantity: 0, type: "PHYSICAL_STORE" },
          ],
        },
        isMarketable: true,
      },
    ],
  });
});

it("GET /api/v1/produto/:locality/:id - Recupera Produto: success", async () => {
  const { body } = await request(app).get("/api/v1/produto/moema/38273");
  expect(body).toEqual({
    message: "success",
  });
});

it("GET /api/v1/produto/:locality/:id - Tenta recuperar SKU não existente :fail", async () => {
  const { body } = await request(app).get("/api/v1/produto/moema/11111");
  expect(body).toEqual({
    error: "produto com codigo sku '11111' nao encontrado.",
  });
});

it("GET /api/v1/produto/:locality/:id - Tenta recuperar produto de localidade não existente :fail", async () => {
  const { body } = await request(app).get("/api/v1/produto/sc/38273");
  expect(body).toEqual({
    error: "localizacao 'sc' nao encontrada.",
  });
});

it("GET /api/v1/produtos - Atualiza isMarketable e inventory.quantity", async () => {
  const { body } = await request(app).get("/api/v1/produtos");
  expect(body.items[1].isMarketable).toBe(false);
  expect(body.items[1].inventory.quantity).toBe(0);
});

it("POST /api/v1/editar - Edita produto: success", async () => {
  let newProduct = {
    sku: 38273,
    name: "Good Girl Carolina Herrera Eau de Parfum - Perfume Feminino 24ml",
    inventory: {
      quantity: 10,
      warehouses: [
        { locality: "SP", quantity: 5, type: "ECOMMERCE" },
        { locality: "MOEMA", quantity: 5, type: "PHYSICAL_STORE" },
      ],
    },
    isMarketable: true,
  };
  const { body } = await request(app).post("/api/v1/editar").send(newProduct);
  expect(body).toEqual({ message: "produto editado com sucesso" });

  const response = await request(app).get("/api/v1/produtos");
  expect(response.body).toEqual({
    items: [
      {
        sku: 43264,
        name:
          "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        inventory: {
          quantity: 15,
          warehouses: [
            { locality: "SP", quantity: 12, type: "ECOMMERCE" },
            { locality: "MOEMA", quantity: 3, type: "PHYSICAL_STORE" },
          ],
        },
        isMarketable: true,
      },
      {
        sku: 38273,
        name:
          "Good Girl Carolina Herrera Eau de Parfum - Perfume Feminino 24ml",
        inventory: {
          quantity: 10,
          warehouses: [
            { locality: "SP", quantity: 5, type: "ECOMMERCE" },
            { locality: "MOEMA", quantity: 5, type: "PHYSICAL_STORE" },
          ],
        },
        isMarketable: true,
      },
    ],
  });
});

it("GET /api/v1/deletar/:id - Deleta produto por sku: success", async () => {
  const { body } = await request(app).get("/api/v1/deletar/43264");
  expect(body).toEqual({ message: "produto removido com sucesso" });
  const response = await request(app).get("/api/v1/produtos");
  expect(response.body).toEqual({
    items: [
      {
        sku: 38273,
        name:
          "Good Girl Carolina Herrera Eau de Parfum - Perfume Feminino 24ml",
        inventory: {
          quantity: 10,
          warehouses: [
            { locality: "SP", quantity: 5, type: "ECOMMERCE" },
            { locality: "MOEMA", quantity: 5, type: "PHYSICAL_STORE" },
          ],
        },
        isMarketable: true,
      },
    ],
  });
});

server.close();
