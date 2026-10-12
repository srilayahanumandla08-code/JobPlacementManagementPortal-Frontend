import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import Matches from "./pages/Matches";
import StudentsManagement from "./pages/StudentsManagement";
import CompaniesManagement from "./pages/CompaniesManagement";
import JobsManagement from "./pages/JobsManagement";
import Statistics from "./pages/Statistics";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/profile" element={<Profile />} />

        {/* Recruiter */}
        <Route path="/recruiter" element={<RecruiterDashboard />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/admin/students"
          element={<StudentsManagement />}
        />
        <Route
          path="/admin/companies"
          element={<CompaniesManagement />}
        />
        <Route
          path="/admin/jobs"
          element={<JobsManagement />}
        />
        <Route
          path="/admin/statistics"
          element={<Statistics />}
        />

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;