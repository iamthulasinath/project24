import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Mock login - in a real app, this would make an API call
    if (email === "user@example.com" && password === "password") {
      setUser({
        id: "1",
        name: "John Doe",
        email: email,
      });
      navigate("/home");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Sign in to your account</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <p className="demo-credentials">
          Demo credentials:
          <br />
          Email: user@example.com
          <br />
          Password: password
        </p>
      </div>
    </div>
  );
};
