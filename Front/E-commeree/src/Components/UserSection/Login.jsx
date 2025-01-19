import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Message from "../../Message";

function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [issuccess, setSuccess] = useState(null); // null for no message
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (password.length < 8) {
      setMessage("Password must be more than 8 characters");
      setSuccess(false);
      return;
    }

    const upperCase = /[A-Z]/;
    const specialCase = /[@#$%&*!]/;

    if (upperCase.test(password) && specialCase.test(password)) {
      if (login === true) {
        Axios.post("https://e-commerce-website-zt25.onrender.com/api/login", { email, password })
          .then((response) => {
            setSuccess(true);
            setMessage("Login successfully!");
            console.log(response.data,"login data")
            localStorage.setItem("token", response.data.token);
            navigate("/")
          })
          .catch((error) => {
            setSuccess(false);
            setMessage("Login failed");
          });
      } else {
        Axios.post("https://e-commerce-website-zt25.onrender.com/api/signup", { username: userName, email, password })
          .then((response) => {
            setSuccess(true);
            setMessage("Signup  successfully!");
            localStorage.setItem("token", response.data.token);
            navigate("/")
          })
          .catch((error) => {
            setSuccess(false);
            setMessage( "Sign-up failed");
          });
      }
    } else {
      setMessage("Password must contain at least one uppercase letter and one special symbol");
      setSuccess(false);
    }
  };

  const switchTo = () => {
    setLogin((prev) => !prev);
    setMessage("");
    setSuccess(null);
  };

  return (
    <>
      <div>
        <div className="login-form">
          <div className="login">
            <h1>{login ? "Login" : "Sign Up"}</h1>
            {issuccess !== null && <Message success={issuccess} message={message} />}
            {login ? (
              <div>
                <div className="form">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="additional">
                  <p className="exist" onClick={switchTo}>
                    If you don't have an account? <span>Sign Up</span>
                  </p>
                  <Link to="/reset-password">
                    <p className="forgetPassword">Forgot Password</p>
                  </Link>
                </div>
                <button className="submit" onClick={handleSubmit}>
                  Login
                </button>
              </div>
            ) : (
              <div>
                <div className="form">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="additional">
                  <p className="exist" onClick={switchTo}>
                    If you already have an account? <span>Login</span>
                  </p>
                </div>
                <button className="submit" onClick={handleSubmit}>
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
