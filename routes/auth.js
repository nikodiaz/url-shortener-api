import express from "express"
import dotenv from "dotenv"
import { signin, signup } from "../controllers/authController.js"

dotenv.config()

const authRouter = express.Router()

authRouter.post("/api/signup", signup)
authRouter.post("/api/signin", signin)

export default authRouter
