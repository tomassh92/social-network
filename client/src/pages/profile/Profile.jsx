import "./profile.scss"
import Posts from "../../components/posts/Posts"
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import InstagramIcon from "@mui/icons-material/Instagram"
import PinterestIcon from "@mui/icons-material/Pinterest"
import TwitterIcon from "@mui/icons-material/Twitter"
import PlaceIcon from "@mui/icons-material/Place"
import LanguageIcon from "@mui/icons-material/Language"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import MoreVertIcon from "@mui/icons-material/MoreVert"

const profile = {
  id: 2,
  name: "Jane Doe",
  userId: 2,
  profilePic:
    "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
  coverPic:
    "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
}

const Profile = () => {
  return (
    <div className="profile">
      <img src={profile.coverPic} alt="" className="cover" />
      <div className="profileContainer">
        <div className="profileInfo">
          <img src={profile.profilePic} alt="" className="profilePicture" />
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
            <span className="name">{profile.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon fontSize="small" />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon fontSize="small" />
                <span>lama.dev</span>
              </div>
            </div>
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  )
}

export default Profile
