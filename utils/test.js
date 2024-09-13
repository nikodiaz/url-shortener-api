import request from "supertest"
import app from "../index.js"

export const loginUserAndGetToken = async () => {
  const loginDetails = {
    email: "nikodiaz56@gmail.com",
    password: "niko1234"
  }

  const res = await request(app).post("/api/signin").send(loginDetails)

  if (res.statusCode !== 200) {
    throw new Error(`Error al iniciar sesión: ${res.body.message}`)
  }

  return res.body.token
}
test('dummy test', () => {
  expect(true).toBe(true);
});
