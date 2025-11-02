import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosConfig";
import "./Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoggingIn(true);
      const res = await API.post("/auth/login", { email, password });
      const token = res.data.token;

      onLogin(token); // update App.jsx state immediately
      navigate("/movies");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back 👋</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="johndoe@123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loggingIn}>
          {loggingIn ? "Logging in..." : "Log in"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <p className="switch-auth">
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
