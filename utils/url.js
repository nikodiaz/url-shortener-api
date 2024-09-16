import { nanoid } from "nanoid"
import QRCode from "qrcode"
import Url from "../models/Url.js"

const BASE_URL = process.env.BASE_URL

export const generateQr = async (url) => {
  try {
    const qrCode = await QRCode.toDataURL(url)
    return qrCode
  } catch (error) {
    throw new Error("Error al generar el código QR")
  }
}

export const generateShortUrl = async (originalUrl, user) => {
  if (user) {
    const existingUrl = await Url.findOne({ originalUrl })
    if (existingUrl) {
      return existingUrl
    }
  }

  const shortUrl = nanoid(7)
  const fullShortUrl = `${BASE_URL}/${shortUrl}`

  const qrCode = await generateQr(fullShortUrl)
  const newUrl = new Url({ originalUrl, shortUrl, qrCode, user: user || null })
  await newUrl.save()
  return newUrl
}

export const generateShortUrlForAnonymous = async (originalUrl, usageLimit = 5) => {
  const shortUrl = nanoid(7)
  const fullShortUrl = `${BASE_URL}/${shortUrl}`

  const qrCode = generateQr(fullShortUrl)

  const urlData = {
    originalUrl,
    shortUrl,
    qrCode,
    usageLimit,
    usageCount: 0
  }

  return urlData
}

export const trackUrlVisits = async (shortUrl) => {
  const url = await Url.findOne({ shortUrl })
  if (url) {
    url.visits += 1
    await url.save()
    return url.originalUrl
  }
  throw new Error("URL no encontrada")
}
