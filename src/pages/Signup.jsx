import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Signup({ auth }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = auth.signup(form);  // ✅ hook handles everything

    if (result.success) {
      alert("Account created successfully!");
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input name="name"     placeholder="Name"     value={form.name}     onChange={handleChange} />
          <input name="email"    placeholder="Email"    value={form.email}    onChange={handleChange} />
          <input name="password" placeholder="Password" value={form.password} onChange={handleChange} type="password" />
          {error && <p className="error-text">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p onClick={() => navigate("/")}>Already have an account? Login</p>
      </div>
    </div>
  );
}

export default Signup;