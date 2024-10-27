import { app, sequelize, setupDb } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeAll(async () => {
    await setupDb();
  });

  afterEach(async () => {
    await sequelize.truncate({ cascade: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/products").send({
      id: "1",
      name: "Shirt",
      description: "A good shirt",
      stock: 10,
      purchasePrice: 20,
    });

    expect(response.status).toEqual(201);
  });
});
