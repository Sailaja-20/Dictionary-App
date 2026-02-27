import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!user.name.trim()) errs.name = "Name required";
    if (!user.email.trim()) errs.email = "Email required";
    if (!user.password.trim()) errs.password = "Password required";
    if (user.password && user.password.length < 6) errs.password = "Password must be 6+ chars";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const emailLower = user.email.trim().toLowerCase();

    if (users.some(u => u.email === emailLower)) {
      alert("Account already exists!");
      return;
    }

    users.push({
      name: user.name.trim(),
      email: emailLower,
      password: user.password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={user.name} onChange={handleChange} />
          {errors.name && <p className="error-text">{errors.name}</p>}
          <input name="email" placeholder="Email" value={user.email} onChange={handleChange} />
          {errors.email && <p className="error-text">{errors.email}</p>}
          <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
          {errors.password && <p className="error-text">{errors.password}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p onClick={() => navigate("/")}>Already have an account? Login</p>
      </div>
    </div>
  );
}

export default Signup;