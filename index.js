import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import router from "./routes/index.js"

dotenv.config();

const app = express()
const port = process.env.PORT || 3000

//Connect to DB

connectDB()

//Middleware for handling CORS
app.use(cors())

//Middleware for handling JSON
app.use(express.json())

//Routes
app.use("/", router)

//Starts the server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})

export default app
