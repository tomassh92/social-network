import jwt from "jsonwebtoken"
import moment from "moment"
import { db } from "../connect.js"

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) {
    return res.status(401).json("Not logged in!")
  }

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q = `
      SELECT p.*, u.id AS userId, name, profilePicture
      FROM posts AS p 
      JOIN users AS u ON (u.id = p.userId)
      LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId =? ORDER BY p.createdAt DESC
    `
    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
  })
}

export const getUserPosts = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) {
    return res.status(401).json("Not logged in!")
  }

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q = `
      SELECT p.*, u.id AS userId, name, profilePicture FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE userId = ? ORDER BY p.createdAt DESC
    `
    db.query(q, [req.params.userId], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
  })
}

export const addPost = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) {
    return res.status(401).json("Not logged in!")
  }

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q =
      "INSERT INTO posts(`description`,`image`, `createdAt`, `userId`) VALUES (?)"

    const values = [
      req.body.description,
      req.body.image,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ]
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json("Post has been created!")
    })
  })
}
