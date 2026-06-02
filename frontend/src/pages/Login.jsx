import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/feed");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="login-title">
          SocialSphere 🚀
        </h1>

        <p className="login-subtitle">
          Connect with the world
        </p>

        <form onSubmit={handleLogin}>

          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            className="login-btn"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="signup-link">
          Don't have an account?
          <Link to="/register">
            {" "}Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;