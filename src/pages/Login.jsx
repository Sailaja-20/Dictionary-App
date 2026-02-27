import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const emailLower = loginData.email.trim().toLowerCase();
    const password = loginData.password;

    const validUser = users.find(u => u.email === emailLower && u.password === password);

    if (validUser) {
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" value={loginData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
        <p onClick={() => navigate("/signup")}>Don't have an account? Signup</p>
      </div>
    </div>
  );
}

export default Login;