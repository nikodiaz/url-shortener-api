import mongoose from "mongoose";

const visitsByDateSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  count: { type: Number, default: 0 }
})

// Create a model of Url
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  qrCode: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  visits: { type: Number, default: 0 },
  visitsByDate: [visitsByDateSchema],
  createdAt: { type: Date, default: Date.now }
})

const Url = mongoose.model('Url', urlSchema)

export default Url
