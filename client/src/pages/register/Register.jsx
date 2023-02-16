import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./register.scss"

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs)
    } catch (err) {
      setError(err.response.data)
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="possword"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <span className="error">{error.length ? error : null}</span>
            <button>Register</button>
          </form>
        </div>
        <div className="right">
          <h1>Cara libro.</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
            itaque delectus architecto sapiente laudantium nam corrupti minima
            laboriosam ullam nesciunt dolorum, numquam asperiores officia rerum
            at quod illum nemo quam?
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
