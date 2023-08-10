import request from "supertest";
import app from "../../../src/app";
import {
  mockProcessUptime
} from "jest-mock-process";

describe("/api/v1/health endpoint", () => {
  test("[GET] should return 200 when healthcheck is UP", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message", "OK");
  });

  test("[GET] should return 500 when healthcheck is DOWN", async () => {
    mockProcessUptime(0);
    const res = await request(app).get("/api/v1/health");
    expect(res.statusCode).toEqual(500);

    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty("message", "Server isn't running");
  });
});
