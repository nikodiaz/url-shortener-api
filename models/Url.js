import mongoose from "mongoose";

// Create a model of Url
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  qrCode: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  visits: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

const Url = mongoose.model('Url', urlSchema)

export default Url
