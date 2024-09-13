import request from "supertest"
import app from "../index.js"
import { loginUserAndGetToken } from "../utils/test.js"

describe("GET /user/visits_by_date", () => {
  let token
  beforeAll(async () => {
    token = await loginUserAndGetToken()
  })
  it("Should return total visits by user sort by date", async () => {
    const res = await request(app).get("/user/visits_by_date").set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("visitsByDate")
  })

  it("Should fail if you are not logged in", async () => {
    const res = await request(app).get("/user/visits_by_date")

    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toBe("Acceso denegado, se requiere autenticación")
  })
})
