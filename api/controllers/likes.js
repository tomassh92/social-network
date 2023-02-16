import jwt from "jsonwebtoken"
import moment from "moment"
import { db } from "../connect.js"

export const getLikes = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) {
    return res.status(401).json("Not logged in!")
  }

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q = `SELECT l.*, u.id AS userId, name, profilePicture FROM likes AS l JOIN users AS u ON (u.id = l.userId) WHERE l.postId = ?`
    db.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
  })
}

export const addLike = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) {
    return res.status(401).json("Not logged in!")
  }

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q = "INSERT INTO likes(`userId`, `postId`) VALUES (?)"

    const values = [userInfo.id, req.query.postId]
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json("Like has been added!")
    })
  })
}

export const removeLike = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) {
    return res.status(401).json("Not logged in!")
  }

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q = "DELETE FROM likes WHERE userId = ? AND postId = ?"

    const values = [userInfo.id, req.query.postId]
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json("Like has been removed!")
    })
  })
}
