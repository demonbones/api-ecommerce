const request = require("supertest");
const app = require("../app.js");

let id;
let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/users/login")
    .send({ email: "user@gmail.com", password: "123" });
  token = res.body.token;
});

test("GET /categories retorna status 200 y un array", async () => {
  const res = await request(app).get("/categories");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /CATEGORIES/ retorna status 201 y conincida con el body ", async () => {
  const category = {
    name: "tech",
  };
  const res = await request(app)
    .post("/categories")
    .send(category)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(category.name);
  expect(res.body.id).toBeDefined();
});

test("PUT /CATEGORIES/:ID retorna status 200 y coincide con el body", async () => {
  const UPDATEcategory = {
    name: "mobile",
  };
  const res = await request(app)
    .put(`/categories/${id}`)
    .send(UPDATEcategory)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(UPDATEcategory.name);
});

test("DELETE /categories/:ID  retorna status 204 ", async () => {
  const res = await request(app)
    .delete(`/categories/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
