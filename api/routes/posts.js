import express from "express"
import { addPost, getPosts, getUserPosts } from "../controllers/posts.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/:userId", getUserPosts)
router.post("/", addPost)
export default router
