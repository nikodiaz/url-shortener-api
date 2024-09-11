import Url from "../models/Url.js";
import QRCode from "qrcode"
import { nanoid } from "nanoid";

const BASE_URL = process.env.BASE_URL

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
    const fullShortUrl = `${BASE_URL}/${shortUrl}`
    const qrCode = await QRCode.toDataURL(fullShortUrl)

    const newUrl = new Url({ originalUrl, shortUrl, qrCode })
    await newUrl.save()



    res.json({ shortUrl: fullShortUrl, qrCode })
  } catch (error) {
    res.status(500).json({ message: `Error al acortar la URL:`, error })
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
  } catch (error) {
    res.status(500).json({ message: 'Error al redirigir a la URL:', error })
  }
}
