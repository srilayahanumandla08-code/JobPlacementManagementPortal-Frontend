import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Statistics() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0
  });

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {

    try {

      const [
        statsResponse,
        applicationsResponse
      ] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/applications")
      ]);

      setStats(statsResponse.data);
      setApplications(applicationsResponse.data);

    } catch (error) {

      console.error(error);

      alert("Unable to load statistics");

    }
  };

  const applied = applications.filter(
    (a) => a.status === "Applied"
  ).length;

  const shortlisted = applications.filter(
    (a) => a.status === "Shortlisted"
  ).length;

  const rejected = applications.filter(
    (a) => a.status === "Rejected"
  ).length;

 return (
  <div className="page statistics-page">

      <button onClick={() => navigate("/admin")}>
        ← Back to Admin
      </button>

      <h1>📊 Placement Statistics</h1>

      <p>
        Overall placement management statistics.
      </p>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">👨‍🎓</div>
          <h3>Students</h3>
          <strong>{stats.totalStudents}</strong>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <h3>Companies</h3>
          <strong>{stats.totalCompanies}</strong>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <h3>Jobs</h3>
          <strong>{stats.totalJobs}</strong>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <h3>Applications</h3>
          <strong>{stats.totalApplications}</strong>
        </div>

      </div>

      <section className="admin-section">

        <h2>📋 Application Status</h2>

        <div className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <h3>Applied</h3>
            <strong>{applied}</strong>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <h3>Shortlisted</h3>
            <strong>{shortlisted}</strong>
          </div>

          <div className="stat-card">
            <div className="stat-icon">❌</div>
            <h3>Rejected</h3>
            <strong>{rejected}</strong>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Statistics;