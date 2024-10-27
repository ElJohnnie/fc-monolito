import { app, sequelize, setupDb } from "../express";
import request from "supertest";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";

describe("E2E test for checkout", () => {
  beforeAll(async () => {
    await setupDb();
  });

  afterEach(async () => {
    await sequelize.truncate({ cascade: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should do the checkout", async () => {
    await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "client@example.com",
      number: "123123",
      street: "Street",
      city: "City",
      state: "State",
      zipCode: "123123",
      document: "0000",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "1",
      name: "My Product",
      description: "Product description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "2",
      name: "My Product 2",
      description: "Product description",
      purchasePrice: 25,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1",
        products: [{ productId: "1" }, { productId: "2" }],
      });

    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.total).toEqual(125);
    expect(response.body.status).toEqual("approved");
  });
});