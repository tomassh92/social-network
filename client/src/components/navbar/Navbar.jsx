import "./navbar.scss"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import GridViewIcon from "@mui/icons-material/GridView"
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import SearchIcon from "@mui/icons-material/Search"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"

import { Link } from "react-router-dom"
import { useContext } from "react"
import { DarkModeContext } from "../../context/darkModeContext"
import { AuthContext } from "../../context/authContext"

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>caralibro</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <LightModeOutlinedIcon onClick={toggleDarkMode} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggleDarkMode} />
        )}
        <GridViewIcon />
        <div className="search">
          <SearchIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <Person2OutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link
          to={`/profile/${currentUser.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="user">
            <img src={"/upload/" + currentUser.profilePicture} alt="" />
            <span>{currentUser.name}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
