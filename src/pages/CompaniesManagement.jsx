import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CompaniesManagement() {

  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {

    try {

      const response =
        await api.get("/companies");

      setCompanies(response.data);

    } catch (error) {

      console.error(error);

      alert("Unable to load companies");

    }
  };

  const deleteCompany = async (id) => {

    if (!window.confirm(
      "Deleting this company may also delete its jobs and applications. Continue?"
    )) {
      return;
    }

    try {

      await api.delete(`/companies/${id}`);

      alert("Company deleted successfully");

      loadCompanies();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data ||
        "Unable to delete company"
      );

    }
  };

  return (
    <div className="page">

      <button onClick={() => navigate("/admin")}>
        ← Back to Admin
      </button>

      <h1>🏢 Manage Companies</h1>

      <div className="card-grid">

        {companies.length === 0 ? (

          <div className="info-card">
            <h2>No Companies</h2>
            <p>No companies are registered yet.</p>
          </div>

        ) : (

          companies.map((company) => (

            <div
              className="management-card"
              key={company.id}
            >

              <h2>{company.name}</h2>

              <p>
                <strong>Company ID:</strong>{" "}
                {company.id}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {company.location || "Not specified"}
              </p>

              <p>
                <strong>Industry:</strong>{" "}
                {company.industry || "Not specified"}
              </p>

              <p>
                <strong>Website:</strong>{" "}
                {company.website || "Not specified"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {company.contactEmail || "Not specified"}
              </p>

              <button
                className="danger-button"
                onClick={() =>
                  deleteCompany(company.id)
                }
              >
                🗑 Delete Company
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default CompaniesManagement;