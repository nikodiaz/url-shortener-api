import request from "supertest"
import app from "../index.js"
import User from "../models/User.js";

describe("POST /api/signup", () => {
  it("Should register an user", async () => {
    const res = await request(app)
      .post("/api/signup")
      .send({
        username: "fakeuser",
        email: "fakeemail@example.com",
        password: "abcd1234"
      })


    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty("token")
  })

  it("Should fail when registering a user with an existing email", async () => {

    const user = new User({ username: "testuser", email: "testemail@example.com", password: "abcd1234" })
    user.save()

    const res = await request(app)
      .post("/api/signup")
      .send({ username: "testuser", email: "testemail@example.com", password: "abcd1234" })

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe('Ya existe un usuario con ese email');
  })

  it("Should fail if any field is missing from the record", async () => {
    const res = await request(app)
      .post("/api/signup")
      .send({ email: "testemail@example.com", password: "abcd1234" })

    expect(res.statusCode).toEqual(500)
  })
})

describe("POST /api/signin", () => {


  it("Should login successfully", async () => {
    const res = await request(app)
      .post("/api/signin")
      .send({
        email: "fakeemail@example.com",
        password: "abcd1234"
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("token")
  })

  it("Should fail if the email does not exist", async () => {
    const res = await request(app).post("/api/signin").send({
      email: "nonexistent@example.com",
      password: "abcd1234"
    })

    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toBe("No existe un usuario con ese email")
  })

  it("Should fail if the password is incorrect", async () => {
    const res = await request(app).post("/api/signin").send({
      email: "fakeemail@mail.com",
      password: "wrongpassword"
    })

    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toBe("Contraseña incorrecta")

  })
})
