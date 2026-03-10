import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ForgotPassword({ auth }) {
  const navigate = useNavigate();
  const [form, setForm]   = useState({ email: "", newPassword: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = auth.resetPassword(form);  // ✅ hook handles everything

    if (result.success) {
      alert("Password updated successfully!");
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            value={form.newPassword}
            onChange={e => setForm({ ...form, newPassword: e.target.value })}
            required
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit">Update Password</button>
        </form>
        <p onClick={() => navigate("/")}>Back to Login</p>
      </div>
    </div>
  );
}

export default ForgotPassword;