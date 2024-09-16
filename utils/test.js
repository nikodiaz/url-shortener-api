import request from "supertest"
import app from "../index.js"
import mongoose from "mongoose"
import Url from "../models/Url.js"
import { nanoid } from "nanoid"

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
it('dummy test', () => {
  expect(true).toBe(true);
})

export const createUrl = async (user) => {

  const url = await Url.create({
    _id: new mongoose.Types.ObjectId(),
    originalUrl: "https://nicolasdiaz.vercel.app/",
    shortUrl: "http://localhost:3000/" + nanoid(7),
    qrCode: "qr_placeholder",
    user: user.id,
    visits: 10,
    visitsByDate: [
      { date: new Date("2024-09-01"), count: 5 },
      { date: new Date("2024-09-02"), count: 3 },
      { date: new Date("2024-09-03"), count: 2 }
    ],
    createdAt: new Date("2024-07-18")
  })

  return url
}
