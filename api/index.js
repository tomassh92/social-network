import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import multer from "multer"
import authRouter from "./routes/auth.js"
import commentsRouter from "./routes/comments.js"
import likesRouter from "./routes/likes.js"
import postsRouter from "./routes/posts.js"
import storiesRouter from "./routes/stories.js"
import userRouter from "./routes/users.js"
import relationshipsRouter from "./routes/relationships.js"

const app = express()

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  next()
})
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)
app.use(cookieParser())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file
  res.status(200).json(file.filename)
})
app.use("/api/users", userRouter)
app.use("/api/posts", postsRouter)
app.use("/api/comments", commentsRouter)
app.use("/api/likes", likesRouter)
app.use("/api/auth", authRouter)
app.use("/api/stories", storiesRouter)
app.use("/api/relationships", relationshipsRouter)

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳")
})

app.listen("8800", () => {
  console.log("API working!")
})
