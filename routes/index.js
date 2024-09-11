import express from "express"
import authRouter from "./auth"
import urlRouter from "./url"


const router = express.Router()

//Auth
router.use("/auth", authRouter)
//Url
router.use("/", urlRouter)

export default router
