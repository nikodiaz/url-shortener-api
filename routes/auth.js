import express from "express"
import dotenv from "dotenv"
import { signin, signup } from "../controllers/authController"

dotenv.config()

const authRouter = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)

export default authRouter
