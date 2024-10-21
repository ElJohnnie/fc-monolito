import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app).post("/clients").send({
      name: "john doe",
      email: "john.doe@email.com",
      address: {
        street: "Main Street",
        number: "123",
        complement: "Apt 1",
        city: "New York",
        state: "NY",
        zipCode: "12345",
      },
      document: "215251",
    });

    expect(response.status).toEqual(201);
  });

  it("should not create a client when name is not provided", async () => {
    const response = await request(app).post("/clients").send({
      id: "1",
      email: "john.doe@email.com",
      document: "215251",
      address: "Main Street. 123",
    });

    expect(response.status).toEqual(400);
  });
});
