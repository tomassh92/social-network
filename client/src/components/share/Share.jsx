import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext, useState } from "react"
import Friend from "../../assets/friend.png"
import Image from "../../assets/img.png"
import Map from "../../assets/map.png"
import { makeRequest } from "../../axios"
import { AuthContext } from "../../context/authContext"
import "./share.scss"

const Share = ({ profileId = "" }) => {
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState("")
  const { currentUser } = useContext(AuthContext)
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts" + profileId])
        setDescription("")
        setFile(null)
      },
    }
  )

  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await makeRequest.post("/upload", formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setDescription(e.target.value)
  }

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleClick = async (e) => {
    e.preventDefault()
    let imgUrl = ""
    if (file) imgUrl = await upload()
    mutation.mutate({ description, image: imgUrl })
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + currentUser.profilePicture} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              value={description}
              onChange={handleChange}
            />
          </div>
          <div className="right">
            {file ? (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            ) : (
              ""
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleFile}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share
