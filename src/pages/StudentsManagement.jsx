import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function StudentsManagement() {

  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {

    try {

      const response =
        await api.get("/students");

      setStudents(response.data);

    } catch (error) {

      console.error(error);

      alert("Unable to load students");

    }
  };

  const deleteStudent = async (id) => {

    if (!window.confirm(
      "Are you sure you want to delete this student?"
    )) {
      return;
    }

    try {

      await api.delete(`/students/${id}`);

      alert("Student deleted successfully");

      loadStudents();

    } catch (error) {

      console.error(error);

      alert("Unable to delete student");

    }
  };

  return (
    <div className="page">

      <button onClick={() => navigate("/admin")}>
        ← Back to Admin
      </button>

      <h1>👨‍🎓 Manage Students</h1>

      <div className="card-grid">

        {students.length === 0 ? (

          <div className="info-card">
            <h2>No Students</h2>
            <p>No students are registered.</p>
          </div>

        ) : (

          students.map((student) => (

            <div
              className="management-card"
              key={student.id}
            >

              <h2>{student.name}</h2>

              <p>
                <strong>Email:</strong>{" "}
                {student.email}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {student.department || "Not specified"}
              </p>

              <p>
                <strong>CGPA:</strong>{" "}
                {student.cgpa || "Not specified"}
              </p>

              <p>
                <strong>Skills:</strong>{" "}
                {student.skills || "Not specified"}
              </p>

              <button
                className="danger-button"
                onClick={() =>
                  deleteStudent(student.id)
                }
              >
                🗑 Delete Student
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default StudentsManagement;