import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado, se requiere autenticación" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { _id: decoded.user }
    next()
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" })
  }

}

export default authMiddleware
