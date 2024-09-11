import express from "express";
import { shortenUrl, redirectUrl } from "../controllers/urlController.js";

const urlRouter = express.Router()

//Endpoints
urlRouter.post('/api/shorten', shortenUrl)
urlRouter.get('/:shortUrl', redirectUrl)

export default urlRouter
