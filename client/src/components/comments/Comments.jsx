import { useMutation, useQueryClient } from "@tanstack/react-query"
import moment from "moment"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { makeRequest } from "../../axios"
import { AuthContext } from "../../context/authContext"
import "./comments.scss"

const Comments = ({ postId, comments }) => {
  const [description, setDescription] = useState("")

  const queryClient = useQueryClient()

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments" + postId])
        setDescription("")
      },
    }
  )

  const handleChange = (e) => {
    setDescription(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    mutation.mutate({ description, postId })
  }

  const { currentUser } = useContext(AuthContext)

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.profilePicture} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          onChange={handleChange}
          value={description}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {comments.map((comment) => {
        return (
          <div className="comment">
            <img src={"/upload/" + comment.profilePicture} alt="" />
            <div className="info">
              <Link
                to={`/profile/${comment.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{comment.name}</span>
              </Link>
              <p>{comment.description}</p>
            </div>
            <div className="date">{moment(comment.createdAt).fromNow()}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Comments
