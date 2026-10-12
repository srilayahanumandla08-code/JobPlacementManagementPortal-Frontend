import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0
  });

  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const [
        statsResponse,
        studentsResponse,
        companiesResponse,
        jobsResponse,
        applicationsResponse
      ] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/students"),
        api.get("/companies"),
        api.get("/jobs"),
        api.get("/applications")
      ]);

      setStats(statsResponse.data);
      setStudents(studentsResponse.data);
      setCompanies(companiesResponse.data);
      setJobs(jobsResponse.data);
      setApplications(applicationsResponse.data);

    } catch (error) {

      console.error("Admin Dashboard Error:", error);

      setError(
        error.response?.data ||
        "Unable to load admin dashboard"
      );

    }
  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (

    <div className="admin-page">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <h2>Job Placement Portal</h2>

        <button onClick={logout}>
          Logout
        </button>

      </header>


      {/* ================= HEADER ================= */}

      <div className="admin-header">

        <h1>Admin Dashboard 🛡️</h1>

        <p>
          Welcome,{" "}
          <strong>
            {user?.name || "Admin"}
          </strong>
          !
        </p>

      </div>


      {/* ================= ERROR ================= */}

      {error && (

        <div className="error-message">
          {error}
        </div>

      )}


      {/* ================= STATISTICS ================= */}

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon">
            👨‍🎓
          </div>

          <h3>
            Students
          </h3>

          <strong>
            {stats.totalStudents}
          </strong>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            🏢
          </div>

          <h3>
            Companies
          </h3>

          <strong>
            {stats.totalCompanies}
          </strong>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            💼
          </div>

          <h3>
            Jobs
          </h3>

          <strong>
            {stats.totalJobs}
          </strong>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            📄
          </div>

          <h3>
            Applications
          </h3>

          <strong>
            {stats.totalApplications}
          </strong>

        </div>

      </div>


      {/* ================= ADMIN ACTIONS ================= */}

      <section className="admin-section">

        <h2>
          ⚙️ Admin Controls
        </h2>

        <div className="dashboard-grid">


          {/* STUDENTS */}

          <div className="dashboard-card">

            <h2>
              👨‍🎓 Students
            </h2>

            <p>
              View and manage registered students.
            </p>

            <button
              onClick={() =>
                navigate("/admin/students")
              }
            >
              Manage Students
            </button>

          </div>


          {/* COMPANIES */}

          <div className="dashboard-card">

            <h2>
              🏢 Companies
            </h2>

            <p>
              View and manage registered companies.
            </p>

            <button
              onClick={() =>
                navigate("/admin/companies")
              }
            >
              Manage Companies
            </button>

          </div>


          {/* JOBS */}

          <div className="dashboard-card">

            <h2>
              💼 Jobs
            </h2>

            <p>
              View and manage available jobs.
            </p>

            <button
              onClick={() =>
                navigate("/admin/jobs")
              }
            >
              Manage Jobs
            </button>

          </div>


          {/* STATISTICS */}

          <div className="dashboard-card">

            <h2>
              📊 Statistics
            </h2>

            <p>
              View placement statistics.
            </p>

            <button
              onClick={() =>
                navigate("/admin/statistics")
              }
            >
              View Statistics
            </button>

          </div>


        </div>

      </section>


      {/* ================= STUDENTS ================= */}

      <section className="admin-section">

        <h2>
          👨‍🎓 Registered Students
        </h2>

        {students.length === 0 ? (

          <p>
            No students registered.
          </p>

        ) : (

          <div className="data-grid">

            {students.map((student) => (

              <div
                className="data-card"
                key={student.id}
              >

                <h3>
                  {student.name}
                </h3>

                <p>
                  <strong>Email:</strong>{" "}
                  {student.email}
                </p>

                <p>
                  <strong>Department:</strong>{" "}
                  {student.department ||
                    "Not specified"}
                </p>

                <p>
                  <strong>CGPA:</strong>{" "}
                  {student.cgpa ||
                    "Not specified"}
                </p>

                <p>
                  <strong>Skills:</strong>{" "}
                  {student.skills ||
                    "Not specified"}
                </p>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* ================= COMPANIES ================= */}

      <section className="admin-section">

        <h2>
          🏢 Registered Companies
        </h2>

        {companies.length === 0 ? (

          <p>
            No companies registered.
          </p>

        ) : (

          <div className="data-grid">

            {companies.map((company) => (

              <div
                className="data-card"
                key={company.id}
              >

                <h3>
                  {company.name}
                </h3>

                <p>
                  <strong>Location:</strong>{" "}
                  {company.location ||
                    "Not specified"}
                </p>

                <p>
                  <strong>Industry:</strong>{" "}
                  {company.industry ||
                    "Not specified"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {company.contactEmail ||
                    "Not specified"}
                </p>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* ================= JOBS ================= */}

      <section className="admin-section">

        <h2>
          💼 Available Jobs
        </h2>

        {jobs.length === 0 ? (

          <p>
            No jobs available.
          </p>

        ) : (

          <div className="data-grid">

            {jobs.map((job) => (

              <div
                className="data-card"
                key={job.id}
              >

                <h3>
                  {job.jobTitle ||
                    "Job Opportunity"}
                </h3>

                <p>
                  <strong>Location:</strong>{" "}
                  {job.location ||
                    "Not specified"}
                </p>

                <p>
                  <strong>Salary:</strong>{" "}
                  {job.salary
                    ? `₹${job.salary}`
                    : "Not specified"}
                </p>

                <p>
                  <strong>Eligibility:</strong>{" "}
                  {job.eligibility ||
                    "Not specified"}
                </p>

                <p>
                  <strong>Last Date:</strong>{" "}
                  {job.lastDate ||
                    "Not specified"}
                </p>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* ================= APPLICATIONS ================= */}

      <section className="admin-section">

        <h2>
          📄 Applications
        </h2>

        {applications.length === 0 ? (

          <p>
            No applications available.
          </p>

        ) : (

          <div className="applications-table">

            <div className="table-header">

              <span>
                ID
              </span>

              <span>
                Student
              </span>

              <span>
                Job
              </span>

              <span>
                Status
              </span>

            </div>


            {applications.map((application) => (

              <div
                className="table-row"
                key={application.id}
              >

                <span>
                  #{application.id}
                </span>

                <span>
                  {application.student?.name ||
                    "Unknown"}
                </span>

                <span>
                  {application.job?.jobTitle ||
                    "Job"}
                </span>

                <span
                  className={
                    application.status ===
                    "Shortlisted"
                      ? "status shortlisted"
                      : application.status ===
                        "Rejected"
                      ? "status rejected"
                      : "status applied"
                  }
                >
                  {application.status}
                </span>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>

  );
}

export default AdminDashboard;