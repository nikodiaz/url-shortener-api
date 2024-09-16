import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

//Create a connection with MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    if (process.env.NODE_ENV !== 'test') {
      console.log('Conectado a MongoDB');
    }
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message)
    process.exit(1)
  }
}

export default connectDB
