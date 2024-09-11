import express from "express"
import authRouter from "./auth.js"
import urlRouter from "./url.js"


const router = express.Router()

//Auth
router.use("/", authRouter)
//Url
router.use("/", urlRouter)

export default router
