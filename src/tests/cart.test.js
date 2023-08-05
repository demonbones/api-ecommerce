const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");

let token;
let id;

beforeAll(async () => {
  const res = await request(app)
    .post("/users/login")
    .send({ email: "user@gmail.com", password: "123" });
  token = res.body.token;
});

test("GET /CART  retorna status 200 y un array", async () => {
  const res = await request(app)
    .get("/cart")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /CART retorna status 201 y coicide con el body ", async () => {
  const product = await Product.create({
    title: "tablet",
    description: "table china",
    brand: "china",
    price: 100000,
  });

  const res = await request(app)
    .post("/cart")
    .send({
      quantity: 1,
      productId: product.id,
    })
    .set("Authorization", `Bearer ${token}`);

  id = res.body.id;

  await product.destroy();

  expect(res.status).toBe(201);
  expect(res.body).toBeInstanceOf(Object);
});

test("PUT /CART/:ID", async () => {
  const res = await request(app)
    .put(`/cart/${id}`)
    .send({ quantity: 3 })
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(3);
});

test("DELETE /CART/:ID retorna status 204 ", async () => {
  const res = await request(app)
    .delete(`/cart/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
