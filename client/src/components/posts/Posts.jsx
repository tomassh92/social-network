import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import Post from "../post/Post"
import "./posts.scss"

const Posts = ({ profileId = "" }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts" + profileId],
    queryFn: () =>
      makeRequest
        .get(profileId ? `/posts/${profileId}` : "/posts")
        .then((res) => {
          return res.data
        }),
  })

  return (
    <div className="posts">
      {!isLoading
        ? data.map((post) => {
            return <Post post={post} key={post.id} />
          })
        : "Loading posts"}
    </div>
  )
}

export default Posts
