import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (role) => {
    setForm({
      ...form,
      role,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/users/register", form);

      const data = response.data;

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
        })
      );

      if (data.role === "STUDENT") {
        navigate("/student", { replace: true });
      } else if (data.role === "RECRUITER") {
        navigate("/recruiter", { replace: true });
      } else if (data.role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        setMessage("Invalid account role.");
      }

    } catch (error) {
      console.error("Registration error:", error);

      setMessage(
        error.response?.data?.message ||
        error.response?.data ||
        "Registration failed. This email may already be registered."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* Background decoration */}
      <div className="register-glow register-glow-one"></div>
      <div className="register-glow register-glow-two"></div>

      <div className="register-card">

        {/* Brand */}
        <div className="register-brand">
          <div className="register-logo">✦</div>
          <span>HireAI</span>
        </div>

        {/* Heading */}
        <div className="register-heading">
          <h1>Create Your Account</h1>

          <p>
            Join HireAI and start your smarter placement journey.
          </p>
        </div>

        {/* Progress */}
        <div className="register-progress">
          <div className="progress-active"></div>
          <div></div>
          <div></div>
        </div>

        <div className="progress-text">
          Set up your HireAI account
        </div>

        {/* Form */}
        <form onSubmit={handleRegister}>

          {/* Name */}
          <label>Full Name</label>

          <div className="input-wrapper">
            <span className="input-icon">👤</span>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <label>Email Address</label>

          <div className="input-wrapper">
            <span className="input-icon">✉️</span>

            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <label>Password</label>

          <div className="input-wrapper">
            <span className="input-icon">🔒</span>

            <input
              type="password"
              name="password"
              placeholder="Create a secure password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Account type */}
          <label className="account-type-label">
            Choose Account Type
          </label>

          <div className="role-options">

            {/* STUDENT */}
            <button
              type="button"
              className={`role-option ${
                form.role === "STUDENT" ? "active" : ""
              }`}
              onClick={() => handleRoleChange("STUDENT")}
            >
              <div className="role-icon student-icon">
                🎓
              </div>

              <div className="role-info">
                <strong>Student</strong>
                <small>Find jobs & track applications</small>
              </div>

              <div className="role-check">
                {form.role === "STUDENT" ? "✓" : ""}
              </div>
            </button>


            {/* RECRUITER */}
            <button
              type="button"
              className={`role-option ${
                form.role === "RECRUITER" ? "active" : ""
              }`}
              onClick={() => handleRoleChange("RECRUITER")}
            >
              <div className="role-icon recruiter-icon">
                💼
              </div>

              <div className="role-info">
                <strong>Recruiter</strong>
                <small>Post jobs & find talent</small>
              </div>

              <div className="role-check">
                {form.role === "RECRUITER" ? "✓" : ""}
              </div>
            </button>


            {/* ADMIN */}
            <button
              type="button"
              className={`role-option ${
                form.role === "ADMIN" ? "active" : ""
              }`}
              onClick={() => handleRoleChange("ADMIN")}
            >
              <div className="role-icon admin-icon">
                🛡️
              </div>

              <div className="role-info">
                <strong>Admin</strong>
                <small>Manage the placement portal</small>
              </div>

              <div className="role-check">
                {form.role === "ADMIN" ? "✓" : ""}
              </div>
            </button>

          </div>

          {/* Error / message */}
          {message && (
            <div className="register-error">
              ⚠️ {message}
            </div>
          )}

          {/* Submit */}
          <button
            className="register-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account →"}
          </button>

        </form>

        {/* Login */}
        <div className="already-account">
          <span>Already have an account?</span>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Sign In
          </button>
        </div>

        {/* Security */}
        <div className="register-security">
          🔒 Your information is securely protected
        </div>

      </div>
    </div>
  );
}

export default Register;