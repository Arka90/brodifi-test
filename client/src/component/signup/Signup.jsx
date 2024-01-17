import React from "react";
import { useState } from "react";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setError(null);
    e.preventDefault();

    if (password !== confirmPassword)
      return setError("Password and Confirm password should be same");

    axios
      .post("http://localhost:9000/auth/register", {
        userName: username,
        password: password,
      })
      .then((res) => {
        if (res.data.status === "failed") {
          setError(res.data.message);
        }

        if (res.data.status === "Success") {
          setPassword("");
          setUsername("");
          setConfirmPassword("");
          alert("User Created");
        }
      })
      .catch((e) => setError(e.message));
  };

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
        <button className="login" onClick={() => navigate("/login")}>
          LogIn
        </button>
      </form>
      <div className="error">{error && error}</div>
    </div>
  );
};

export default Signup;
