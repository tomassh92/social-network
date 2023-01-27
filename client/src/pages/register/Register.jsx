import "./register.scss"
import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="possword" placeholder="Password" />
            <input type="text" placeholder="Name" />
            <button>Register</button>
          </form>
        </div>
        <div className="right">
          <h1>Lama Social.</h1>
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
