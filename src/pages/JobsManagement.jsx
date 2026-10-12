import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function JobsManagement() {

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {

    try {

      const response =
        await api.get("/jobs");

      setJobs(response.data);

    } catch (error) {

      console.error(error);

      alert("Unable to load jobs");

    }
  };

  const deleteJob = async (id) => {

    if (!window.confirm(
      "Are you sure you want to delete this job?"
    )) {
      return;
    }

    try {

      await api.delete(`/jobs/${id}`);

      alert("Job deleted successfully");

      loadJobs();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data ||
        "Unable to delete job"
      );

    }
  };

  return (
    <div className="page">

      <button onClick={() => navigate("/admin")}>
        ← Back to Admin
      </button>

      <h1>💼 Manage Jobs</h1>

      <div className="card-grid">

        {jobs.length === 0 ? (

          <div className="info-card">
            <h2>No Jobs</h2>
            <p>No jobs are available.</p>
          </div>

        ) : (

          jobs.map((job) => (

            <div
              className="management-card"
              key={job.id}
            >

              <h2>
                {job.jobTitle || "Job Opportunity"}
              </h2>

              <p>
                <strong>Job ID:</strong>{" "}
                {job.id}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {job.description || "Not specified"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {job.location || "Not specified"}
              </p>

              <p>
                <strong>Salary:</strong>{" "}
                {job.salary
                  ? `₹${job.salary}`
                  : "Not specified"}
              </p>

              <p>
                <strong>Eligibility:</strong>{" "}
                {job.eligibility || "Not specified"}
              </p>

              <p>
                <strong>Last Date:</strong>{" "}
                {job.lastDate || "Not specified"}
              </p>

              <button
                className="danger-button"
                onClick={() =>
                  deleteJob(job.id)
                }
              >
                🗑 Delete Job
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default JobsManagement;