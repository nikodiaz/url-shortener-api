import request from "supertest"
import jwt from "jsonwebtoken"
import app from "../index.js"
import { loginUserAndGetToken, createUrl } from "../utils/test.js"

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

describe("GET /user/visits/total", () => {
  let token
  beforeAll(async () => {
    token = await loginUserAndGetToken()
  })
  it("Should get a total visits by user", async () => {
    const res = await request(app).get("/user/visits/total").set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("totalVisits")
  })

  it("Should fail if you are not logged in", async () => {
    const res = await request(app).get("/user/visits/total")

    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toBe("Acceso denegado, se requiere autenticación")
  })
})

describe("GET /user/links/total", () => {
  let token
  beforeAll(async () => {
    token = await loginUserAndGetToken()
  })

  it("Should get a total links by user", async () => {
    const res = await request(app).get("/user/links/total").set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("totalLinks")
  })

  it("Should fail if you are not logged in", async () => {
    const res = await request(app).get("/user/links/total")

    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toBe("Acceso denegado, se requiere autenticación")
  })
})

describe("GET /user/visits/dates", () => {
  let token
  beforeAll(async () => {
    token = await loginUserAndGetToken()
  })
  it("Should get a total visits of each link by date", async () => {
    const res = await request(app).get("/user/visits/dates").set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("links")
  })

  it("Should fail if you are not logged in", async () => {
    const res = await request(app).get("/user/visits/dates")

    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toBe("Acceso denegado, se requiere autenticación")
  })
})

describe("GET /visits/link/:linkId", () => {
  let token
  let linkId
  let userId
  let url
  beforeAll(async () => {
    token = await loginUserAndGetToken()
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    userId = decodedToken.id
    url = await createUrl({ id: userId })
    linkId = url._id.toString()
  })
  it("Should get a total visits of each link by date", async () => {
    const res = await request(app)
      .get(`/user/visits/link/${linkId}`)
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("visits")
  })

  it("Should fail if you are not logged in", async () => {
    const res = await request(app).get("/user/visits/dates")

    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toBe("Acceso denegado, se requiere autenticación")
  })

})
