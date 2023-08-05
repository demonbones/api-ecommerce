const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
require("../models");

let id;
let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/users/login")
    .send({ email: "user@gmail.com", password: "123" });
  token = res.body.token;
});

test("GET /PRODUCTS retorna status 200 y un array", async () => {
  const res = await request(app).get("/products");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /PRODUCTS restorna status 201 y coincide con el body", async () => {
  const newCategory = await Category.create({ name: "informatica" });
  const newProduct = {
    title: "Monitor Ultrawide Lg 34 Ips Hrd10 Freesync 75Hz 34Wp500 B Negro",
    description:
      "Amplía un 32% más tu superficie útil gracias al formato 21:9 UltraWide™",
    brand: "LG",
    price: 1.3679,
    categoryId: newCategory.id,
  };

  const res = await request(app)
    .post("/products")
    .send(newProduct)
    .set("Authorization", `Bearer ${token}`);

  await newCategory.destroy();
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.title).toBe(newProduct.title);
  expect(res.body.id).toBeDefined();
});

test("GET /PRODUCTS/:ID  retorna status 200 y un objeto", async () => {
  const res = await request(app).get(`/products/${id}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Object);
});

test("PUT /PRODUCTS/:ID  retorna status 200 y coicide con el body", async () => {
  const updatedProduc = { brand: "Benq" };
  const res = await request(app)
    .put(`/products/${id}`)
    .send(updatedProduc)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.brand).toBe(updatedProduc.brand);
});

test("POST /PRODUCTS/:ID/IMAGES retorna status 200 y un array", async () => {
  const image = await request(app)
    .post("/product_images")
    .attach("image", "C:/Users/RYZEN3/Pictures/wallpapers/1425374501290.jpg")
    .set("Authorization", `Bearer ${token}`);

  const res = await request(app)
    .post(`/products/${id}/images`)
    .send([image.body.id])
    .set("Authorization", `Bearer ${token}`);

  await request(app)
    .delete(`/product_images/${image.body.id}`)
    .set("Authorization", `Bearer ${token}`);

  await image.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
}, 10000);

test("DELETE /PRODCTS/:ID retorna status 204", async () => {
  const res = await request(app)
    .delete(`/products/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
