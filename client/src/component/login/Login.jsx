import React from "react";
import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    setError(null);
    e.preventDefault();

    axios
      .post("http://localhost:9000/auth/login", {
        userName: username,
        password: password,
      })
      .then((res) => {
        if (res.data.status === "failed") {
          setError(res.data.message);
        }

        if (res.data.status === "success") {
          setPassword("");
          setUsername("");

          setUser(res.data);
          navigate("/");
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="log-in-form">
      <h2>Log In</h2>
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

        <button disabled={loading} type="submit">
          Log In
        </button>
        <button
          disabled={loading}
          className="login"
          onClick={() => navigate("/signup")}
        >
          Sigin Up
        </button>
      </form>
      <div className="error">{error && error}</div>
    </div>
  );
};

export default Login;
