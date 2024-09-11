import express from "express";
import { shortenUrl, redirectUrl } from "../controllers/urlController.js";

const urlRouter = express.Router()

//Endpoints
router.post('/api/shorten', shortenUrl)
router.get('/:shortUrl', redirectUrl)

export default urlRouter
