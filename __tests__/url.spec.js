import request from "supertest";
import app from "../index.js";
import Url from "../models/Url.js";
import { nanoid } from "nanoid";
import { generateQr } from "../utils/url.js";

describe("POST /api/shorten", () => {
  it("Should shorten an Url", async () => {
    const res = await request(app).post('/api/shorten').send({ originalUrl: "https://nicolasdiaz.vercel.app/" })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('shortUrl')
  })

  it("Should fail if original url is missing", async () => {
    const res = await request(app).post("/api/shorten").send({})

    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toBe("La URL original es requerida.")
  })
})

describe("GET /:shortUrl", () => {
  it("Should redirect to original URL", async () => {
    const originalUrl = "https://nicolasdiaz.vercel.app/"
    const shortUrl = nanoid(7)
    const fullShortUrl = `http://localhost:3000/${shortUrl}`
    const qrCode = await generateQr(fullShortUrl)
    const url = new Url({
      originalUrl,
      shortUrl,
      qrCode
    })
    await url.save()

    const res = await request(app).get("/" + shortUrl)

    expect(res.statusCode).toEqual(302)
    expect(res.headers.location).toBe("https://nicolasdiaz.vercel.app/")
  })

  it("Should return a 404 if it cannot find the URL", async () => {
    const res = await request(app).get("/nonexistent")

    expect(res.statusCode).toEqual(404)
    expect(res.body.message).toBe("URL no encontrada")
  })
})
