import jwt from "jsonwebtoken"
import { db } from "../connect.js"

export const getRelationships = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) {
    return res.status(401).json("Not logged in!")
  }

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q =
      "SELECT followerUserId from relationships WHERE followedUserId = ?"

    const values = [req.query.userId]
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(data.map((i) => i.followerUserId))
    })
  })
}

export const followUser = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) {
    return res.status(401).json("Not logged in!")
  }

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q =
      "INSERT INTO relationships(`followerUserId`, `followedUserId`) VALUES (?)"

    const values = [userInfo.id, req.query.userId]
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json("User has been followed!")
    })
  })
}

export const unfollowUser = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) {
    return res.status(401).json("Not logged in!")
  }

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q =
      "DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = ?"

    const values = [userInfo.id, req.query.userId]
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json("User has been unfollowed!")
    })
  })
}
