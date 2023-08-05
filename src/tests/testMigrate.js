const sequelize = require("../utils/connection");
const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

const main = async () => {
  try {
    // Acciones a ejecutar antes de los tests
    sequelize.sync();
    const user = {
      firstName: "test",
      lastName: "user",
      email: "user@gmail.com",
      phone: "123456789",
      password: "123",
    };

    const userFound = await User.findOne({ where: { email: user.email } });

    if (!userFound) await request(app).post("/users").send(user);
  } catch (error) {
    console.log(error);
  }
};

main();
