import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import "./login.scss"

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/")
    } catch (err) {
      setError(err.response.data)
    }
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello world</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
            itaque delectus architecto sapiente laudantium nam corrupti minima
            laboriosam ullam nesciunt dolorum, numquam asperiores officia rerum
            at quod illum nemo quam?
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <span className="error">{error.length ? error : null}</span>
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
