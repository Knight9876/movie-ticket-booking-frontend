import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosConfig";
import "./Signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setSigningIn(true)
      await API.post("/auth/signup", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }finally {
      setSigningIn(false)
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account ✨</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <button type="submit" disabled={signingIn}>
          {signingIn ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <p className="switch-auth">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
}
