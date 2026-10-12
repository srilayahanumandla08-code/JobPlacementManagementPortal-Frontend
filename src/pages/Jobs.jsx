import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Jobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await api.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error loading jobs:", error);
      alert("Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const applyForJob = async (jobId) => {
    try {
      setApplying(jobId);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        navigate("/");
        return;
      }

      const studentResponse = await api.get(
        `/students/email/${user.email}`
      );

      const student = studentResponse.data;

      await api.post("/applications", {
        studentId: student.id,
        jobId: jobId,
      });

      alert("Application submitted successfully! 🎉");

    } catch (error) {
      console.error("Application error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to apply for this job."
      );
    } finally {
      setApplying(null);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="jobs-page">
          <h1>Loading jobs...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page">

      <div className="jobs-page">

        <button onClick={() => navigate("/student")}>
          ← Back to Dashboard
        </button>

        <div className="jobs-heading">
          <h1>💼 Available Jobs</h1>
          <p>
            Discover opportunities that match your career goals.
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="job-card">
            <h2>No jobs available</h2>
            <p>
              New opportunities will appear here when recruiters
              publish jobs.
            </p>
          </div>
        ) : (

          <div className="jobs-grid">

            {jobs.map((job) => (

              <div className="job-card" key={job.id}>

                <h2>
                  {job.jobTitle || "Job Opportunity"}
                </h2>

                <div className="job-info">

                  <p>
                    📍 <strong>Location:</strong>{" "}
                    {job.location || "Not specified"}
                  </p>

                  <p>
                    💰 <strong>Salary:</strong>{" "}
                    {job.salary
                      ? `₹${Number(job.salary).toLocaleString("en-IN")}`
                      : "Not specified"}
                  </p>

                  <p>
                    🎓 <strong>Eligibility:</strong>{" "}
                    {job.eligibility || "Not specified"}
                  </p>

                  <p>
                    📅 <strong>Last Date:</strong>{" "}
                    {job.lastDate || "Not specified"}
                  </p>

                </div>

                <div className="job-description">
                  <strong>Description</strong>
                  <p>
                    {job.description ||
                      "No description provided for this position."}
                  </p>
                </div>

                <button
                  className="apply-button"
                  onClick={() => applyForJob(job.id)}
                  disabled={applying === job.id}
                >
                  {applying === job.id
                    ? "Applying..."
                    : "Apply Now →"}
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Jobs;