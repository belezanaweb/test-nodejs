const request = require("supertest");

const app = require("../../src/app");
const MockFactory = require("../factory");

jest.setTimeout(10000);

describe("Product API Crud", () => {
    it("should insert when sku is not in database", async () => {
        const product = MockFactory.BobTheMockBuilder();
        const response = await request(app)
            .post("/product")
            .send(product);
    expect(response.status).toBe(200);
    });
})