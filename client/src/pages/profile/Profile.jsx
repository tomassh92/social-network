import EditIcon from "@mui/icons-material/Edit"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone"
import InstagramIcon from "@mui/icons-material/Instagram"
import LanguageIcon from "@mui/icons-material/Language"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import PinterestIcon from "@mui/icons-material/Pinterest"
import PlaceIcon from "@mui/icons-material/Place"
import TwitterIcon from "@mui/icons-material/Twitter"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useContext, useRef } from "react"
import { useParams } from "react-router-dom"
import { makeRequest } from "../../axios"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import { AuthContext } from "../../context/authContext"
import "./profile.scss"

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const { id } = useParams()
  const coverUploadRef = useRef(null)
  const profileUploadRef = useRef(null)

  const {
    isLoading: isLoadingProfile,
    error,
    data,
  } = useQuery({
    queryKey: ["profile" + id],
    queryFn: () =>
      makeRequest.get("/users?userId=" + id).then((res) => {
        return res.data
      }),
  })
  const {
    isLoading: isLoadingFollowers,
    error: errorFollowers,
    data: followers,
  } = useQuery({
    queryKey: ["relationship" + id],
    queryFn: () =>
      makeRequest.get("/relationships?userId=" + id).then((res) => {
        return res.data
      }),
  })

  const isCurrentUserProfile = currentUser.id === parseInt(id)
  const isFollowed = !isLoadingFollowers && followers.includes(currentUser.id)

  const queryClient = useQueryClient()
  const mutation = useMutation(
    (action) => {
      return makeRequest.post(`/relationships/${action}?userId=` + id)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship" + id])
      },
    }
  )

  const profileMutation = useMutation(
    (updatedProfile) => {
      return makeRequest.put(`/users/update?userId=` + id, updatedProfile)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile" + id])
      },
    }
  )

  const toggleFollow = () => {
    const action = isFollowed ? "unfollow" : "follow"
    mutation.mutate(action)
  }

  const handleCoverEditClick = () => {
    coverUploadRef.current.click()
  }

  const handleProfileEditClick = () => {
    profileUploadRef.current.click()
  }

  const upload = async (file) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await makeRequest.post("/upload", formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleCoverEdit = async () => {
    let imgUrl = ""
    const file = coverUploadRef.current.files[0]
    if (file) imgUrl = await upload(file)
    profileMutation.mutate({ ...data, coverPicture: imgUrl })
  }

  const handleProfileEdit = async () => {
    let imgUrl = ""
    const file = profileUploadRef.current.files[0]
    if (file) imgUrl = await upload(file)
    profileMutation.mutate({ ...data, profilePicture: imgUrl })
  }

  if (isLoadingProfile) {
    return "Loading profile"
  }

  return (
    <div className="profile">
      <div className="cover-container">
        <img
          src={
            "/upload/" + data.coverPicture ||
            "https://timelinecovers.pro/facebook-cover/download/anonymous-unseen-facebook-cover.jpg"
          }
          alt=""
          className="cover"
        />
        <input
          type="file"
          ref={coverUploadRef}
          style={{ display: "none" }}
          onChange={handleCoverEdit}
        />
        <EditIcon className="edit" onClick={handleCoverEditClick} />
      </div>

      <div className="profileContainer">
        <div className="profileInfo">
          <div className="profile-picture-container">
            <img
              src={
                "/upload/" + data.profilePicture ||
                "https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
              }
              alt=""
              className="profilePicture"
            />
            <input
              type="file"
              ref={profileUploadRef}
              style={{ display: "none" }}
              onChange={handleProfileEdit}
            />
            <EditIcon className="edit" onClick={handleProfileEditClick} />
          </div>
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span className="name">{data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon fontSize="small" />
                <span>{data.city}</span>
              </div>
              <div className="item">
                <LanguageIcon fontSize="small" />
                <span>{data.website}</span>
              </div>
            </div>
            {isCurrentUserProfile ? null : (
              <button onClick={toggleFollow}>
                {isFollowed ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        {isCurrentUserProfile ? <Share profileId={id} /> : null}
        <Posts profileId={id} />
      </div>
    </div>
  )
}

export default Profile
