import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function StudentDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/");
      return;
    }

    try {
      const currentUser = JSON.parse(savedUser);
      setUser(currentUser);
      loadApplications(currentUser.email);
    } catch (error) {
      console.error("User data error:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  const loadApplications = async (email) => {
    try {
      const response = await api.get("/applications");

      const filtered = response.data.filter(
        (application) => application.student?.email === email
      );

      setApplications(filtered);
    } catch (error) {
      console.error("Failed to load applications:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const totalApplications = applications.length;

  const shortlisted = applications.filter(
    (application) => application.status === "Shortlisted"
  ).length;

  const rejected = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  const applied = applications.filter(
    (application) =>
      application.status === "Applied" ||
      application.status === "Pending"
  ).length;

  return (
    <div className="student-dashboard">

      {/* ================= NAVBAR ================= */}
      <header className="student-navbar">

        <div
          className="brand-area"
          onClick={() => navigate("/student")}
        >
          <div className="brand-mark">✦</div>

          <div className="brand-text">
            <h2>HireAI</h2>
            <span>Placement Intelligence</span>
          </div>
        </div>

        <nav className="student-nav">

          <button
            className="nav-link active"
            onClick={() => navigate("/student")}
          >
            Dashboard
          </button>

          <button
            className="nav-link"
            onClick={() => navigate("/jobs")}
          >
            Jobs
          </button>

          <button
            className="nav-link"
            onClick={() => navigate("/matches")}
          >
            AI Matches
          </button>

          <button
            className="nav-link"
            onClick={() => navigate("/applications")}
          >
            Applications
          </button>

        </nav>

        <div className="nav-profile">

          <div className="profile-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div className="nav-user-info">
            <strong>{user.name}</strong>
            <span>Student</span>
          </div>

          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* ================= MAIN ================= */}
      <main className="student-main">

        {/* HERO */}
        <section className="student-hero">

          <div className="hero-content">

            <div className="hero-small-label">
              <span className="status-dot"></span>
              STUDENT PORTAL
            </div>

            <h1>
              Welcome back,{" "}
              <span>{user.name}</span> 👋
            </h1>

            <p>
              Discover opportunities, find your best job matches,
              and stay on top of your placement journey.
            </p>

            <div className="hero-actions">

              <button
                className="primary-action"
                onClick={() => navigate("/jobs")}
              >
                Explore Jobs
                <span>→</span>
              </button>

              <button
                className="secondary-action"
                onClick={() => navigate("/matches")}
              >
                <span>✦</span>
                AI Job Matches
              </button>

            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-orbit orbit-one"></div>
            <div className="hero-orbit orbit-two"></div>

            <div className="hero-ai-card">

              <div className="ai-sparkle">✦</div>

              <div>
                <span>AI POWERED</span>
                <strong>Career Matching</strong>
              </div>

              <div className="ai-arrow">→</div>

            </div>

            <div className="floating-badge badge-top">
              <span>✓</span>
              Smart Matching
            </div>

            <div className="floating-badge badge-bottom">
              <span>⚡</span>
              Career Ready
            </div>

          </div>

        </section>


        {/* ================= QUICK STATS ================= */}
        <section className="student-stats">

          <div className="student-stat-card">

            <div className="stat-icon purple">
              📄
            </div>

            <div className="stat-info">
              <span>Total Applications</span>
              <strong>{totalApplications}</strong>
            </div>

            <div className="stat-arrow">↗</div>

          </div>


          <div className="student-stat-card">

            <div className="stat-icon blue">
              ⏳
            </div>

            <div className="stat-info">
              <span>Active Applications</span>
              <strong>{applied}</strong>
            </div>

            <div className="stat-arrow">↗</div>

          </div>


          <div className="student-stat-card">

            <div className="stat-icon green">
              ✓
            </div>

            <div className="stat-info">
              <span>Shortlisted</span>
              <strong>{shortlisted}</strong>
            </div>

            <div className="stat-arrow">↗</div>

          </div>


          <div className="student-stat-card">

            <div className="stat-icon red">
              ×
            </div>

            <div className="stat-info">
              <span>Rejected</span>
              <strong>{rejected}</strong>
            </div>

            <div className="stat-arrow">↗</div>

          </div>

        </section>


        {/* ================= FEATURE CARDS ================= */}
        <section className="student-section">

          <div className="section-heading">

            <div>
              <span className="section-eyebrow">
                YOUR PLACEMENT HUB
              </span>

              <h2>Everything you need</h2>

              <p>
                Manage your profile, discover jobs and get intelligent
                recommendations from one place.
              </p>
            </div>

          </div>


          <div className="student-feature-grid">

            {/* PROFILE */}
            <div className="feature-card profile-card">

              <div className="feature-top">

                <div className="large-feature-icon profile">
                  👤
                </div>

                <span className="feature-number">
                  01
                </span>

              </div>

              <h3>My Profile</h3>

              <p>
                Keep your academic information, skills and
                career details up to date.
              </p>

              <button
                onClick={() => navigate("/profile")}
              >
                View Profile
                <span>→</span>
              </button>

            </div>


            {/* JOBS */}
            <div className="feature-card jobs-card">

              <div className="feature-top">

                <div className="large-feature-icon jobs">
                  💼
                </div>

                <span className="feature-number">
                  02
                </span>

              </div>

              <h3>Explore Jobs</h3>

              <p>
                Browse the latest opportunities and apply
                for roles that fit your career goals.
              </p>

              <button
                onClick={() => navigate("/jobs")}
              >
                Browse Jobs
                <span>→</span>
              </button>

            </div>


            {/* AI MATCHING */}
            <div className="feature-card ai-card">

              <div className="feature-top">

                <div className="large-feature-icon ai">
                  ✦
                </div>

                <span className="feature-number">
                  03
                </span>

              </div>

              <div className="ai-label">
                AI POWERED
              </div>

              <h3>AI Job Matching</h3>

              <p>
                Find opportunities ranked according to your
                skills and profile.
              </p>

              <button
                onClick={() => navigate("/matches")}
              >
                Find My Matches
                <span>→</span>
              </button>

            </div>


            {/* APPLICATIONS */}
            <div className="feature-card application-card">

              <div className="feature-top">

                <div className="large-feature-icon application">
                  📋
                </div>

                <span className="feature-number">
                  04
                </span>

              </div>

              <h3>My Applications</h3>

              <p>
                Track every application and stay updated
                on your placement progress.
              </p>

              <button
                onClick={() => navigate("/applications")}
              >
                Track Applications
                <span>→</span>
              </button>

            </div>

          </div>

        </section>


        {/* ================= APPLICATION SUMMARY ================= */}
        <section className="application-summary">

          <div className="summary-header">

            <div>
              <span className="section-eyebrow">
                PLACEMENT PROGRESS
              </span>

              <h2>Application Overview</h2>
            </div>

            <button
              onClick={() => navigate("/applications")}
              className="summary-link"
            >
              View all applications →
            </button>

          </div>


          <div className="summary-content">

            <div className="summary-main">

              <div className="summary-circle">

                <div>
                  <strong>{totalApplications}</strong>
                  <span>Applications</span>
                </div>

              </div>

              <div className="summary-message">

                <h3>
                  Keep building your career 🚀
                </h3>

                <p>
                  Apply to relevant opportunities and use AI matching
                  to discover roles that fit your skills.
                </p>

                <button
                  onClick={() => navigate("/jobs")}
                >
                  Find Opportunities →
                </button>

              </div>

            </div>


            <div className="summary-breakdown">

              <div className="breakdown-item">
                <span className="breakdown-dot applied"></span>
                <span>Applied</span>
                <strong>{applied}</strong>
              </div>

              <div className="breakdown-item">
                <span className="breakdown-dot shortlisted"></span>
                <span>Shortlisted</span>
                <strong>{shortlisted}</strong>
              </div>

              <div className="breakdown-item">
                <span className="breakdown-dot rejected"></span>
                <span>Rejected</span>
                <strong>{rejected}</strong>
              </div>

            </div>

          </div>

        </section>


        {/* FOOTER */}
        <footer className="student-footer">
          <span>✦</span>
          HireAI Placement Intelligence
          <span className="footer-dot">•</span>
          Build your career smarter.
        </footer>

      </main>

    </div>
  );
}

export default StudentDashboard;