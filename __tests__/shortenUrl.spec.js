import request from "supertest";
import app from "../index.js";
import Url from "../models/Url.js";


describe('POST /api/shorten', () => {
  it('Should shorten an Url', async () => {
    const res = await request(app).post('/api/shorten').send({ originalUrl: "https://nicolasdiaz.vercel.app/" })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('shortUrl')
  })

  it('Should fail if original url is missing', async () => {
    const res = await request(app).post('/api/shorten').send({})

    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toBe('La URL original es requerida.')
  })
})
