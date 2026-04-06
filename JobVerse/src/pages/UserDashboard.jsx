import { useState, useEffect } from "react";
import API from "../services/api";
import "../styles/UserDashboard.css";

export default function UserDashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetchApplied();
  }, []);

  // 👉 GET APPLIED JOBS
  const fetchApplied = async () => {
    try {
      const res = await API.get("/jobs/applied");
      setAppliedJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 👉 FINAL UPDATE PROFILE (FORMDATA)
  const updateProfile = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });

      if (form.resumeFile) {
        formData.append("resume", form.resumeFile);
      }

      if (form.profilePicFile) {
        formData.append("profilePic", form.profilePicFile);
      }

      const res = await API.put("/user/profile", formData);

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      setForm(res.data);

      setEdit(false);

      alert("Profile Updated ✅");

    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
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
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>

            <button className="edit-btn" onClick={() => setEdit(!edit)}>
              {edit ? "Cancel" : "Edit"}
            </button>
          </div>

          {/* 👉 EDIT FORM */}
          {edit && (
            <div className="edit-form">

              <div className="form-group">
                <label>Name</label>
                <input
                  placeholder="Enter your name"
                  value={form.name || ""}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  placeholder="Enter your email"
                  value={form.email || ""}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Contact</label>
                <input
                  placeholder="Enter contact"
                  value={form.contact || ""}
                  onChange={e => setForm({ ...form, contact: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  placeholder="Enter location"
                  value={form.location || ""}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Experience</label>
                <input
                  placeholder="Experience"
                  value={form.experience || ""}
                  onChange={e => setForm({ ...form, experience: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Current Company</label>
                <input
                  placeholder="Company"
                  value={form.currentCompany || ""}
                  onChange={e => setForm({ ...form, currentCompany: e.target.value })}
                />
              </div>

              {/* 👉 FILE UPLOAD */}
              <div className="form-group">
                <label>Resume</label>
                <input
                  type="file"
                  onChange={e => setForm({ ...form, resumeFile: e.target.files[0] })}
                />
              </div>

              <div className="form-group">
                <label>Profile Picture</label>
                <input
                  type="file"
                  onChange={e => setForm({ ...form, profilePicFile: e.target.files[0] })}
                />
              </div>

              <button className="save-btn" onClick={updateProfile}>
                Save Changes
              </button>

            </div>
          )}

        </div>

        {/* APPLIED JOBS */}
        <div className="job-section">
          <h2>Applied Jobs</h2>

          {appliedJobs.length === 0 && <p>No jobs applied yet</p>}

          {appliedJobs.map(app => (
            <div className="job-card" key={app._id}>
              <h3>{app.job?.title}</h3>
              <p>{app.job?.company}</p>
              <p>{app.job?.location}</p>

              <span className={`status ${app.status}`}>
                {app.status || "pending"}
              </span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}