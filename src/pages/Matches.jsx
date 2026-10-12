import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Matches() {

  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const studentResponse =
        await api.get(
          `/students/email/${encodeURIComponent(user.email)}`
        );

      const studentId =
        studentResponse.data.id;

      const response =
        await api.get(
          `/matching/student/${studentId}`
        );

      setMatches(response.data);

    } catch (error) {

      console.error("Matching Error:", error);

      alert(
        error.response?.data ||
        "Unable to load job recommendations"
      );

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <div className="page">
        <h2>🤖 Finding your best job matches...</h2>
      </div>
    );

  }

  return (
    <div className="page">

      <button onClick={() => navigate("/student")}>
        ← Back to Dashboard
      </button>

      <h1>🤖 AI Job Recommendations</h1>

      <p>
        Jobs are ranked based on your skills
        and job requirements.
      </p>

      {matches.length === 0 ? (

        <div className="info-card">

          <h2>No matching jobs found</h2>

          <p>
            Add more skills to your profile
            to get better recommendations.
          </p>

        </div>

      ) : (

        <div className="card-grid">

          {matches.map((job) => (

            <div
              className="match-card"
              key={job.jobId}
            >

              <h2>
                {job.jobTitle || "Job Opportunity"}
              </h2>

              <p>
                📍 <strong>Location:</strong>{" "}
                {job.location || "Not specified"}
              </p>

              <p>
                💰 <strong>Salary:</strong>{" "}
                {job.salary
                  ? `₹${job.salary}`
                  : "Not specified"}
              </p>

              <p>
                🎯 <strong>Match:</strong>{" "}
                {job.matchPercentage}%
              </p>

              <p>
                ❌ <strong>Missing Skills:</strong>{" "}
                {job.missingSkills?.length
                  ? job.missingSkills.join(", ")
                  : "None 🎉"}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Matches;