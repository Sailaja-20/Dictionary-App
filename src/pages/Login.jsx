import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login({ auth }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = auth.login(form);  

    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error); 
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p onClick={() => navigate("/signup")}>Don't have an account? Signup</p>
        <p onClick={() => navigate("/forgot")}>Forgot Password?</p>
      </div>
    </div>
  );
}

export default Login;
