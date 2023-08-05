const request = require("supertest");
const app = require("../app.js");

let id;
let token;
test("POST /USERS retorna status 201 y un objeto", async () => {
  const newUser = {
    firstName: "stiven",
    lastName: "drada",
    email: "stiven@gmail.com",
    phone: "123456",
    password: "123456",
  };
  const res = await request(app).post("/users").send(newUser);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.password).not.toBe(newUser.password);
});

test("POST /USERS/LOGIN retorna status 200 y un array", async () => {
  const body = { email: "stiven@gmail.com", password: "123456" };
  const res = await request(app).post("/users/login").send(body);
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});

test("GET /USERS retorna status 200 y un array", async () => {
  const res = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("PUT /USERS/:ID retorna status 200 y un objeto", async () => {
  const updatedUser = {
    firstName: "stiven",
    lastName: "drada",
    phone: "654321",
  };

  const res = await request(app)
    .put(`/users/${id}`)
    .send(updatedUser)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Object);
  expect(res.body.phone).toBe(updatedUser.phone);
});

test("DELETE /USERS/:ID  retorna status 204 ", async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(204);
});
