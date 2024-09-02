import mongoose from "mongoose";

// Create a model of Url
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true }
})

const Url = mongoose.model('Url', urlSchema)

export default Url
