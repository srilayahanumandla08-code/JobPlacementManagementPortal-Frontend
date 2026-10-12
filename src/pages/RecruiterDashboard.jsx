import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function RecruiterDashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [company, setCompany] = useState({
    name: "",
    location: "",
    industry: "",
    website: "",
    contactEmail: ""
  });

  const [job, setJob] = useState({
    jobTitle: "",
    description: "",
    location: "",
    salary: "",
    eligibility: "",
    lastDate: "",
    companyId: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadCompanies();
    loadJobs();
    loadApplications();
  }, []);

  const loadCompanies = async () => {
    try {
      const response = await api.get("/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Unable to load companies");
    }
  };

  const loadJobs = async () => {
    try {
      const response = await api.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadApplications = async () => {
    try {
      const response = await api.get("/applications");
      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createCompany = async (e) => {
    e.preventDefault();

    try {
      await api.post("/companies", company);

      alert("Company created successfully!");

      setCompany({
        name: "",
        location: "",
        industry: "",
        website: "",
        contactEmail: ""
      });

      loadCompanies();

    } catch (error) {
      console.error(error);
      alert("Failed to create company");
    }
  };

  const createJob = async (e) => {
    e.preventDefault();

    try {

      const selectedCompany = companies.find(
        (c) => c.id === Number(job.companyId)
      );

      await api.post("/jobs", {
        jobTitle: job.jobTitle,
        description: job.description,
        location: job.location,
        salary: Number(job.salary),
        eligibility: job.eligibility,
        lastDate: job.lastDate,
        company: selectedCompany
      });

      alert("Job created successfully!");

      setJob({
        jobTitle: "",
        description: "",
        location: "",
        salary: "",
        eligibility: "",
        lastDate: "",
        companyId: ""
      });

      loadJobs();

    } catch (error) {
      console.error(error);
      alert("Failed to create job");
    }
  };

  const updateStatus = async (id, status) => {

    try {

      await api.put(`/applications/${id}/status`, {
        status: status
      });

      alert(`Application ${status}`);

      loadApplications();

    } catch (error) {
      console.error(error);
      alert("Failed to update application");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="recruiter-page">

      {/* NAVBAR */}

      <header className="navbar">

        <h2>Job Placement Portal</h2>

        <button onClick={logout}>
          Logout
        </button>

      </header>


      {/* HEADER */}

      <main className="recruiter-container">

        <h1>Recruiter Dashboard 💼</h1>

        <p>
          Welcome, <strong>{user?.name || "Recruiter"}</strong>!
        </p>

        {message && (
          <div className="error-message">
            {message}
          </div>
        )}


        {/* CREATE COMPANY */}

        <section className="dashboard-section">

          <h2>🏢 Create Company</h2>

          <form
            className="form-grid"
            onSubmit={createCompany}
          >

            <input
              placeholder="Company Name"
              value={company.name}
              onChange={(e) =>
                setCompany({
                  ...company,
                  name: e.target.value
                })
              }
              required
            />

            <input
              placeholder="Location"
              value={company.location}
              onChange={(e) =>
                setCompany({
                  ...company,
                  location: e.target.value
                })
              }
              required
            />

            <input
              placeholder="Industry"
              value={company.industry}
              onChange={(e) =>
                setCompany({
                  ...company,
                  industry: e.target.value
                })
              }
              required
            />

            <input
              placeholder="Website"
              value={company.website}
              onChange={(e) =>
                setCompany({
                  ...company,
                  website: e.target.value
                })
              }
            />

            <input
              placeholder="Contact Email"
              type="email"
              value={company.contactEmail}
              onChange={(e) =>
                setCompany({
                  ...company,
                  contactEmail: e.target.value
                })
              }
              required
            />

            <button type="submit">
              Create Company
            </button>

          </form>

        </section>


        {/* COMPANIES */}

        <section className="dashboard-section">

          <h2>🏢 My Companies</h2>

          {companies.length === 0 ? (

            <p>No companies available.</p>

          ) : (

            <div className="card-grid">

              {companies.map((company) => (

                <div
                  className="info-card"
                  key={company.id}
                >

                  <h3>{company.name}</h3>

                  <p>
                    <strong>Location:</strong>{" "}
                    {company.location || "Not specified"}
                  </p>

                  <p>
                    <strong>Industry:</strong>{" "}
                    {company.industry || "Not specified"}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {company.contactEmail || "Not specified"}
                  </p>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* CREATE JOB */}

        <section className="dashboard-section">

          <h2>💼 Create Job</h2>

          <form
            className="form-grid"
            onSubmit={createJob}
          >

            <input
              placeholder="Job Title"
              value={job.jobTitle}
              onChange={(e) =>
                setJob({
                  ...job,
                  jobTitle: e.target.value
                })
              }
              required
            />

            <textarea
              placeholder="Job Description"
              value={job.description}
              onChange={(e) =>
                setJob({
                  ...job,
                  description: e.target.value
                })
              }
              required
            />

            <input
              placeholder="Location"
              value={job.location}
              onChange={(e) =>
                setJob({
                  ...job,
                  location: e.target.value
                })
              }
              required
            />

            <input
              type="number"
              placeholder="Salary"
              value={job.salary}
              onChange={(e) =>
                setJob({
                  ...job,
                  salary: e.target.value
                })
              }
              required
            />

            <input
              placeholder="Eligibility"
              value={job.eligibility}
              onChange={(e) =>
                setJob({
                  ...job,
                  eligibility: e.target.value
                })
              }
              required
            />

            <input
              type="date"
              value={job.lastDate}
              onChange={(e) =>
                setJob({
                  ...job,
                  lastDate: e.target.value
                })
              }
              required
            />

            <select
              value={job.companyId}
              onChange={(e) =>
                setJob({
                  ...job,
                  companyId: e.target.value
                })
              }
              required
            >

              <option value="">
                Select Company
              </option>

              {companies.map((company) => (

                <option
                  key={company.id}
                  value={company.id}
                >
                  {company.name}
                </option>

              ))}

            </select>

            <button type="submit">
              Create Job
            </button>

          </form>

        </section>


        {/* JOBS */}

        <section className="dashboard-section">

          <h2>💼 Available Jobs</h2>

          {jobs.length === 0 ? (

            <p>No jobs available.</p>

          ) : (

            <div className="card-grid">

              {jobs.map((job) => (

                <div
                  className="info-card"
                  key={job.id}
                >

                  <h3>
                    {job.jobTitle || "Job Opportunity"}
                  </h3>

                  <p>
                    {job.description || "No description"}
                  </p>

                  <p>
                    📍 {job.location || "Not specified"}
                  </p>

                  <p>
                    💰 ₹{job.salary || "Not specified"}
                  </p>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* APPLICATIONS */}

        <section className="dashboard-section">

          <h2>📄 Student Applications</h2>

          {applications.length === 0 ? (

            <p>No applications yet.</p>

          ) : (

            <div>

              {applications.map((application) => (

                <div
                  className="application-card"
                  key={application.id}
                >

                  <h3>
                    Application #{application.id}
                  </h3>

                  <p>
                    <strong>Student:</strong>{" "}
                    {application.student?.name || "Unknown"}
                  </p>

                  <p>
                    <strong>Job:</strong>{" "}
                    {application.job?.jobTitle || "Job"}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {application.status}
                  </p>

                  <div className="application-buttons">

                    <button
                      onClick={() =>
                        updateStatus(
                          application.id,
                          "Shortlisted"
                        )
                      }
                    >
                      ✅ Shortlist
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          application.id,
                          "Rejected"
                        )
                      }
                    >
                      ❌ Reject
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default RecruiterDashboard;