import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/users/login", {
        email,
        password,
      });

      const user = response.data;

      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "STUDENT") {
        navigate("/student", { replace: true });
      } else if (user.role === "RECRUITER") {
        navigate("/recruiter", { replace: true });
      } else if (user.role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        alert("Invalid role");
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Decorative background */}
      <div className="login-background">
        <div className="login-orb login-orb-one"></div>
        <div className="login-orb login-orb-two"></div>
        <div className="login-grid"></div>
      </div>

      <div className="login-layout">

        {/* ================= LEFT HERO ================= */}
        <section className="login-hero">

          <div className="hero-brand">
            <div className="hero-logo">
              ✦
            </div>

            <div className="hero-brand-text">
              <h2>HireAI</h2>
              <span>JOB & PLACEMENT MANAGEMENT SYSTEM</span>
            </div>
          </div>

          <div className="hero-content">

            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              AI-POWERED PLACEMENT PLATFORM
            </div>

            <h1>
              Your Career.
              <br />
              <span>Smarter with AI.</span>
            </h1>

            <p className="hero-description">
              Discover opportunities, connect with leading companies,
              and manage your complete job and placement journey
              through one intelligent platform.
            </p>

            <div className="hero-features">

              <div className="hero-feature">
                <div className="feature-icon">✦</div>

                <div className="feature-content">
                  <strong>AI Job Matching</strong>
                  <p>Find jobs that match your skills and goals.</p>
                </div>

                <span className="feature-arrow">→</span>
              </div>

              <div className="hero-feature">
                <div className="feature-icon">💼</div>

                <div className="feature-content">
                  <strong>Job Opportunities</strong>
                  <p>Explore and apply for placement opportunities.</p>
                </div>

                <span className="feature-arrow">→</span>
              </div>

              <div className="hero-feature">
                <div className="feature-icon">📊</div>

                <div className="feature-content">
                  <strong>Placement Management</strong>
                  <p>Track applications and placement progress.</p>
                </div>

                <span className="feature-arrow">→</span>
              </div>

            </div>

          </div>

          <div className="hero-bottom">
            <span className="hero-bottom-icon">✦</span>
            <span>
              Your complete job & placement journey, all in one place.
            </span>
          </div>

        </section>


        {/* ================= LOGIN CARD ================= */}
        <section className="login-card">

          <div className="login-card-top">
            <div className="login-card-logo">
              ✦
            </div>

            <div className="login-card-status">
              <span></span>
              Secure Login
            </div>
          </div>

          <div className="login-heading">
            <h1>Welcome back</h1>

            <p>
              Sign in to continue to your{" "}
              <strong>Job & Placement Management System</strong>
            </p>
          </div>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="login-field">
              <label htmlFor="login-email">
                Email Address
              </label>

              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  @
                </span>

                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <label htmlFor="login-password">
                Password
              </label>

              <div className="login-input-wrapper">
                <span className="login-input-icon">
                  •
                </span>

                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              className="login-button"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span>→</span>
                </>
              )}
            </button>

          </form>

          <div className="login-divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <div className="new-user">
            <span>New to HireAI?</span>

            <button
              type="button"
              onClick={() => navigate("/register")}
            >
              Create an Account
              <span>→</span>
            </button>
          </div>

          <div className="login-security">
            <span className="security-icon">🔒</span>

            <div>
              <strong>Secure authentication</strong>
              <small>Your account information is protected</small>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}

export default Login;