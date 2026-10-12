import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Applications() {

  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {

    try {

      const response =
        await api.get("/applications");

      let data = response.data;

      if (user?.role === "STUDENT") {

        data = data.filter(
          (application) =>
            application.student?.email === user.email
        );

      }

      setApplications(data);

    } catch (error) {

      console.error(error);

      alert("Unable to load applications");

    } finally {

      setLoading(false);

    }
  };

  const updateStatus = async (id, status) => {

    try {

      await api.put(
        `/applications/${id}/status`,
        { status }
      );

      alert(`Application ${status}`);

      loadApplications();

    } catch (error) {

      console.error(error);

      alert("Unable to update application");

    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Loading applications...</h2>
      </div>
    );
  }

  return (
    <div className="page">

      <button
        onClick={() => {

          if (user?.role === "STUDENT")
            navigate("/student");

          else if (user?.role === "RECRUITER")
            navigate("/recruiter");

          else
            navigate("/admin");

        }}
      >
        ← Back to Dashboard
      </button>

      <h1>📄 Applications</h1>

      <div className="card-grid">

        {applications.length === 0 ? (

          <div className="info-card">
            <h2>No Applications</h2>
            <p>No applications available.</p>
          </div>

        ) : (

          applications.map((application) => (

            <div
              className="application-card"
              key={application.id}
            >

              <h2>
                Application #{application.id}
              </h2>

              <p>
                <strong>Student:</strong>{" "}
                {application.student?.name || "Unknown"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {application.student?.email || "Unknown"}
              </p>

              <p>
                <strong>Job:</strong>{" "}
                {application.job?.jobTitle ||
                  "Job Opportunity"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {application.job?.location ||
                  "Not specified"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="status">
                  {application.status}
                </span>
              </p>

              {(user?.role === "RECRUITER" ||
                user?.role === "ADMIN") && (

                <div className="button-row">

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
                    className="danger-button"
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

              )}

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default Applications;