import express from "express"
import authRouter from "./auth.js"
import urlRouter from "./url.js"
import userRouter from "./user.js"


const router = express.Router()

//Auth
router.use("/", authRouter)
//Url
router.use("/", urlRouter)
//User
router.use("/user", userRouter)

export default router
