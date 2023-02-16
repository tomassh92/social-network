import express from "express"
import { addLike, getLikes, removeLike } from "../controllers/likes.js"

const router = express.Router()

router.get("/", getLikes)
router.post("/like", addLike)
router.post("/unlike", removeLike)
export default router
