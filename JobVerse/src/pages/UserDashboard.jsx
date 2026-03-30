import { useState, useEffect } from "react";
import API from "../services/api";
import "../styles/UserDashboard.css";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    API.get("/jobs/applied").then(res => setAppliedJobs(res.data));
  }, []);

  const updateProfile = async () => {
    const res = await API.put("/user/profile", form);
    localStorage.setItem("user", JSON.stringify(res.data));
    setEdit(false);
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="side-logo">JobVerse</h2>

        <div className="menu">
          <p>🏠 Profile</p>
          <p>📄 Applied Jobs</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* PROFILE CARD */}
        <div className="profile-card">

          <div className="profile-top">
            <div className="avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>

            <button className="edit-btn" onClick={() => setEdit(!edit)}>
              {edit ? "Cancel" : "Edit"}
            </button>
          </div>

          {edit && (
            <div className="edit-form">
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} />
              <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
              <button onClick={updateProfile}>Save</button>
            </div>
          )}

        </div>

        {/* APPLIED JOBS */}
        <div className="job-section">
          <h2>Applied Jobs</h2>

          {appliedJobs.map(job => (
            <div className="job-card" key={job._id}>
              <h3>{job.job.title}</h3>
              <p>{job.job.company}</p>

              <span className={`status ${job.status}`}>
                {job.status || "under process"}
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}