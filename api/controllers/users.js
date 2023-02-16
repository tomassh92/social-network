import { db } from "../connect.js"

export const getUser = (req, res) => {
  const q = "SELECT * FROM users WHERE id = ?"

  db.query(q, [req.query.userId], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data.length === 0) return res.status(404).json("User not found")

    res.status(200).json(data[0])
  })
}

export const updateUser = (req, res) => {
  const q =
    "UPDATE users SET name = ? ,`coverPicture` = ?,`profilePicture` =?,`city` =?,`website` =? WHERE id = ?"

  const values = [
    req.body.name,
    req.body.coverPicture,
    req.body.profilePicture,
    req.body.city,
    req.body.website,
    req.query.userId,
  ]
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err)
    if (data.length === 0) return res.status(404).json("User not found")

    res.status(200).json(data[0])
  })
}
