import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { getLinkVisitsByDate, getLinkVisitsByUser, getTotalLinksbyUser, getTotalVisitsByUser, getUserVisitsByDate } from "../controllers/analyticsController.js"

const userRouter = express.Router()

userRouter.get("/visits_by_date", authMiddleware, getUserVisitsByDate)

userRouter.get("/visits/total", authMiddleware, getTotalVisitsByUser)

userRouter.get("/visits/link/:link", authMiddleware, getLinkVisitsByUser)

userRouter.get("/links/total", authMiddleware, getTotalLinksbyUser)

userRouter.get("/visits/dates", authMiddleware, getLinkVisitsByDate)

export default userRouter
