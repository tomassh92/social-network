import express from "express"
import {
  followUser,
  unfollowUser,
  getRelationships,
} from "../controllers/relationships.js"

const router = express.Router()

router.get("/", getRelationships)
router.post("/follow", followUser)
router.post("/unfollow", unfollowUser)

export default router
