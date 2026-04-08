import { useState, useEffect } from "react";
import API from "../services/api";
import "../styles/UserDashboard.css";

export default function UserDashboard() {

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [edit, setEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchApplied();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/user/me");
      setUser(res.data);
      setForm(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApplied = async () => {
    try {
      const res = await API.get("/jobs/applied");
      setAppliedJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ UPDATE PROFILE
  const updateProfile = async () => {
    try {
      const formData = new FormData();

      formData.append("name", form.name || "");
      formData.append("email", form.email || "");
      formData.append("contact", form.contact || "");
      formData.append("location", form.location || "");
      formData.append("experience", form.experience || "");
      formData.append("currentCompany", form.currentCompany || "");

      if (form.resumeFile) {
        formData.append("resume", form.resumeFile);
      }

      if (form.profilePicFile) {
        formData.append("profilePic", form.profilePicFile);
      }

      const res = await API.put("/user/profile", formData);

      setUser(res.data);
      setForm(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      setEdit(false);

      alert("Profile Updated ✅");

    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="side-logo">JobVerse</h2>

        <div className="menu">
          <p onClick={() => setActiveTab("profile")}>🏠 Profile</p>
          <p onClick={() => setActiveTab("applied")}>📄 Applied Jobs</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* ================= PROFILE ================= */}
        {activeTab === "profile" && (
          <div className="profile-card">

            <div className="profile-top">
              <div className="avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>

              <button className="edit-btn" onClick={() => setEdit(!edit)}>
                {edit ? "Cancel" : "Edit"}
              </button>
            </div>

            {/* 👉 VIEW MODE */}
            {!edit && (
              <div className="profile-info">
                <p><b>Contact:</b> {user.contact || "N/A"}</p>
                <p><b>Location:</b> {user.location || "N/A"}</p>
                <p><b>Experience:</b> {user.experience || "N/A"}</p>
                <p><b>Company:</b> {user.currentCompany || "N/A"}</p>

                {user.resume && (
                  <p>
                    <b>Resume:</b>{" "}
                    <a
                      href={`http://localhost:5000/${user.resume}`}
                      target="_blank"
                    >
                      View Resume
                    </a>
                  </p>
                )}
              </div>
            )}

            {/* 👉 EDIT MODE */}
            {edit && (
              <div className="edit-form">

                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={form.name || ""}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={form.email || ""}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Contact</label>
                  <input
                    value={form.contact || ""}
                    onChange={e => setForm({ ...form, contact: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    value={form.location || ""}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Experience</label>
                  <input
                    value={form.experience || ""}
                    onChange={e => setForm({ ...form, experience: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Current Company</label>
                  <input
                    value={form.currentCompany || ""}
                    onChange={e => setForm({ ...form, currentCompany: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Resume</label>
                  <input
                    type="file"
                    onChange={e => setForm({ ...form, resumeFile: e.target.files[0] })}
                  />
                </div>

                <div className="form-group">
                  <label>Profile Pic</label>
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
        )}

        {/* ================= APPLIED JOBS ================= */}
        {activeTab === "applied" && (
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
        )}

      </div>
    </div>
  );
}