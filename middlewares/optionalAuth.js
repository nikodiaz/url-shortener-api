import jwt from "jsonwebtoken"

const optionalAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(" ")[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = { _id: decoded.id }
    } catch (error) {

    }

  }
  next()
}

export default optionalAuthMiddleware
