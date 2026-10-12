import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [student, setStudent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    department: "",
    cgpa: "",
    graduationYear: "",
    skills: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await api.get(
        `/students/email/${user.email}`
      );

      const data = response.data;

      setStudent(data);

      setForm({
        phone: data.phone || "",
        department: data.department || "",
        cgpa: data.cgpa || "",
        graduationYear: data.graduationYear || "",
        skills: data.skills || "",
      });
    } catch (error) {
      console.error("Profile loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const updatedStudent = {
        ...student,
        phone: form.phone,
        department: form.department,
        cgpa: form.cgpa,
        graduationYear: form.graduationYear,
        skills: form.skills,
      };

      const response = await api.put(
        `/students/${student.id}`,
        updatedStudent
      );

      setStudent(response.data);

      setForm({
        phone: response.data.phone || "",
        department: response.data.department || "",
        cgpa: response.data.cgpa || "",
        graduationYear: response.data.graduationYear || "",
        skills: response.data.skills || "",
      });

      setEditing(false);
      alert("Profile updated successfully! ✅");
    } catch (error) {
      console.error("Profile update error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const cancelEditing = () => {
    setEditing(false);

    setForm({
      phone: student.phone || "",
      department: student.department || "",
      cgpa: student.cgpa || "",
      graduationYear: student.graduationYear || "",
      skills: student.skills || "",
    });
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <div className="loading-spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="profile-page">
        <div className="profile-not-found">
          <div className="not-found-icon">👤</div>

          <h2>Profile not found</h2>

          <p>
            We couldn't find your student profile.
          </p>

          <button
            className="profile-primary-btn"
            onClick={() => navigate("/student")}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const skillList = student.skills
    ? student.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="profile-page">

      {/* Decorative background */}
      <div className="profile-bg-orb profile-bg-orb-one"></div>
      <div className="profile-bg-orb profile-bg-orb-two"></div>

      <div className="profile-container">

        {/* Top bar */}
        <div className="profile-topbar">

          <button
            className="back-dashboard-btn"
            onClick={() => navigate("/student")}
          >
            <span>←</span>
            Back to Dashboard
          </button>

          {!editing && (
            <button
              className="edit-profile-btn"
              onClick={() => setEditing(true)}
            >
              <span>✏️</span>
              Edit Profile
            </button>
          )}

        </div>

        {/* Page heading */}
        <div className="profile-heading">

          <div>
            <div className="profile-eyebrow">
              STUDENT PROFILE
            </div>

            <h1>
              My Profile
              <span className="heading-dot">.</span>
            </h1>

            <p>
              Manage your academic information, skills and
              career profile.
            </p>
          </div>

        </div>

        {/* Main profile card */}
        <div className="profile-main-card">

          {/* Profile header */}
          <div className="profile-header">

            <div className="large-profile-avatar">
              {student.name
                ? student.name.charAt(0).toUpperCase()
                : "S"}
            </div>

            <div className="profile-identity">

              <div className="profile-name-row">
                <h2>{student.name}</h2>

                <span className="student-badge">
                  🎓 Student
                </span>
              </div>

              <p className="profile-email">
                ✉ {student.email}
              </p>

              <p className="profile-subtitle">
                Build your profile to improve your job
                matching opportunities.
              </p>

            </div>

          </div>

          {/* Divider */}
          <div className="profile-divider"></div>

          {/* Information */}
          <div className="profile-section">

            <div className="section-title">
              <div className="section-title-icon">
                ✨
              </div>

              <div>
                <h3>Personal & Academic Information</h3>
                <p>Your details used throughout the placement portal.</p>
              </div>
            </div>

            <div className="profile-info-grid">

              {/* Phone */}
              <div className="profile-info-item">
                <div className="info-icon">📱</div>

                <div className="info-content">
                  <label>Phone Number</label>

                  {editing ? (
                    <input
                      className="profile-input"
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <span>
                      {student.phone || "Not specified"}
                    </span>
                  )}
                </div>
              </div>

              {/* Department */}
              <div className="profile-info-item">
                <div className="info-icon">🎓</div>

                <div className="info-content">
                  <label>Department</label>

                  {editing ? (
                    <input
                      className="profile-input"
                      type="text"
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      placeholder="Example: AIML"
                    />
                  ) : (
                    <span>
                      {student.department || "Not specified"}
                    </span>
                  )}
                </div>
              </div>

              {/* CGPA */}
              <div className="profile-info-item">
                <div className="info-icon">⭐</div>

                <div className="info-content">
                  <label>CGPA</label>

                  {editing ? (
                    <input
                      className="profile-input"
                      type="number"
                      step="0.01"
                      name="cgpa"
                      value={form.cgpa}
                      onChange={handleChange}
                      placeholder="Example: 8.5"
                    />
                  ) : (
                    <span>
                      {student.cgpa || "Not specified"}
                    </span>
                  )}
                </div>
              </div>

              {/* Graduation */}
              <div className="profile-info-item">
                <div className="info-icon">📅</div>

                <div className="info-content">
                  <label>Graduation Year</label>

                  {editing ? (
                    <input
                      className="profile-input"
                      type="number"
                      name="graduationYear"
                      value={form.graduationYear}
                      onChange={handleChange}
                      placeholder="Example: 2028"
                    />
                  ) : (
                    <span>
                      {student.graduationYear ||
                        "Not specified"}
                    </span>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Skills */}
          <div className="profile-section skills-section">

            <div className="section-title">
              <div className="section-title-icon">
                🚀
              </div>

              <div>
                <h3>Skills & Technologies</h3>
                <p>
                  Skills used by the AI job matching system.
                </p>
              </div>
            </div>

            {editing ? (
              <input
                className="profile-input skills-input"
                type="text"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="Java, Python, SQL, React"
              />
            ) : skillList.length > 0 ? (
              <div className="skill-list">
                {skillList.map((skill, index) => (
                  <span
                    className="skill-badge"
                    key={`${skill}-${index}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <div className="no-skills">
                No skills added yet.
              </div>
            )}

          </div>

          {/* Edit actions */}
          {editing && (
            <div className="profile-actions">

              <button
                className="save-profile-btn"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="button-spinner"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    ✓ Save Changes
                  </>
                )}
              </button>

              <button
                className="cancel-profile-btn"
                onClick={cancelEditing}
                disabled={saving}
              >
                Cancel
              </button>

            </div>
          )}

        </div>

        {/* Bottom tip */}
        <div className="profile-tip">
          <div className="tip-icon">🤖</div>

          <div>
            <strong>AI Matching Tip</strong>
            <p>
              Keep your skills updated to receive more
              relevant job recommendations.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;