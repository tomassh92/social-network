import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import moment from "moment"
import { useContext, useState, memo } from "react"
import { Link } from "react-router-dom"
import { makeRequest } from "../../axios"
import { AuthContext } from "../../context/authContext"
import Comments from "../comments/Comments"
import "./post.scss"

const Post = memo(({ post }) => {
  const [isCommentsOpened, setIsCommentsOpened] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const {
    isLoading: isLoadingLikes,
    error: errorLikes,
    data: likes,
  } = useQuery({
    queryKey: ["likes" + post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => {
        return res.data
      }),
  })

  const {
    isLoading: isLoadingComments,
    error: errorComments,
    data: comments,
  } = useQuery({
    queryKey: ["comments" + post.id],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + post.id).then((res) => {
        return res.data
      }),
  })

  const liked =
    !isLoadingLikes && likes.some((like) => like.userId === currentUser.id)

  const queryClient = useQueryClient()
  const mutation = useMutation(
    (action) => {
      return makeRequest.post(`/likes/${action}?postId=` + post.id)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes" + post.id])
      },
    }
  )

  const date = moment(post.createdAt).fromNow()

  const handleCommentsClick = () => {
    setIsCommentsOpened((prevState) => !prevState)
  }

  const toggleLike = () => {
    mutation.mutate(liked ? "unlike" : "like")
  }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/" + post.profilePicture} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{date}</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        <div className="content">
          <p>{post.description}</p>
          <img src={`/upload/${post.image}`} alt="" />
        </div>
        <div className="actions">
          <div className="item">
            {liked ? (
              <FavoriteOutlinedIcon onClick={toggleLike} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={toggleLike} />
            )}
            {!isLoadingLikes ? `${likes.length} Likes` : "0 Likes"}
          </div>
          <div className="item" onClick={handleCommentsClick}>
            <TextsmsOutlinedIcon />
            {!isLoadingComments ? `${comments.length} Comments` : "0 Comments"}
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {isCommentsOpened ? (
          <Comments postId={post.id} comments={comments} />
        ) : null}
      </div>
    </div>
  )
})

export default Post
