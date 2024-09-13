import express from "express";
import { shortenUrl, redirectUrl } from "../controllers/urlController.js";
import optionalAuthMiddleware from "../middlewares/optionalAuth.js";

const urlRouter = express.Router()

//Endpoints
urlRouter.post('/api/shorten', optionalAuthMiddleware, shortenUrl)
urlRouter.get('/:shortUrl', redirectUrl)

export default urlRouter
