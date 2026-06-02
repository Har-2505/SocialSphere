import { useState } from "react";
import api from "../services/api";

function Login() {
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

      console.log(res.data);

    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;