import Url from "../models/Url.js";
import QRCode from "qrcode"
import { nanoid } from "nanoid";

const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`

//Controller that handler the bussines logic
export const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body

  if (!originalUrl) {
    return res.status(400).json({ message: "La URL original es requerida." });
  }


  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json({ shortUrl: `${BASE_URL}/${url.shortUrl}` });
    }
    const shortUrl = nanoid(8)
    const newUrl = new Url({ originalUrl, shortUrl })
    await newUrl.save()

    const fullShortUrl = `${BASE_URL}/${shortUrl}`
    const qrCode = await QRCode.toDataURL(fullShortUrl)

    res.json({ shortUrl: fullShortUrl, qrCode })
  } catch (e) {
    res.status(500).json({ message: `Error al acortar la URL:`, e })
  }
}

export const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params

  try {
    const url = await Url.findOne({ shortUrl })
    if (url) {
      return res.redirect(url.originalUrl)
    } else {
      return res.status(404).json({ message: 'URL no encontrada' })
    }
  } catch (e) {
    res.status(500).json({ message: 'Error al redirigir a la URL:', e })
  }
}
