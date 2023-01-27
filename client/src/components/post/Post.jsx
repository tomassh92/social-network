import "./post.scss"
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import { Link } from "react-router-dom"
import Comments from "../comments/Comments"
import { useState } from "react"

const Post = ({ post }) => {
  const [isCommentsOpened, setIsCommentsOpened] = useState(false)
  const liked = false

  const handleCommentsClick = () => {
    setIsCommentsOpened((prevState) => !prevState)
  }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">a few seconds ago</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="actions">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={handleCommentsClick}>
            <TextsmsOutlinedIcon />1 Comment
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {isCommentsOpened ? <Comments /> : null}
      </div>
    </div>
  )
}

export default Post
