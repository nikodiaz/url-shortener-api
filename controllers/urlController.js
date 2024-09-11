import Url from "../models/Url.js";
import { generateShortUrl, generateShortUrlForAnonymous } from "../utils/url.js";

//Controller that handler the bussines logic
export const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body
  const user = req.user ? req.user._id : null

  if (!originalUrl) {
    return res.status(400).json({ message: "La URL original es requerida." });
  }

  try {
    let url
    if (user) {
      url = await generateShortUrl(originalUrl, user)
    } else {
      url = await generateShortUrlForAnonymous(originalUrl)
    }

    res.status(200).json({
      shortUrl: url.shortUrl,
      qrCode: url.qrCode,
      ...(user ? {} : { usageLimit: url.usageLimit, usageCount: url.usageCount })
    })
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
