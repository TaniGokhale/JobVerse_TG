import { useState } from "react";
import API from "../services/api";
import "../styles/UserDashboard"

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);

  const updateProfile = async () => {
    const res = await API.put("/user/profile", form);
    localStorage.setItem("user", JSON.stringify(res.data));
    setEdit(false);
    alert("Updated");
  };

  return (
    <div className="profile-container">

      <div className="profile-card">

        <div className="profile-header">
          <h2>My Profile</h2>
          <button className="edit-btn" onClick={() => setEdit(!edit)}>
            {edit ? "Cancel" : "Edit"}
          </button>
        </div>

        {edit ? (
          <>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} />
            <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
            <input value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} />
            <input value={form.currentCompany} onChange={e => setForm({...form, currentCompany: e.target.value})} />

            <button className="save-btn" onClick={updateProfile}>Save</button>
          </>
        ) : (
          <div className="profile-info">
            <p><span>Name:</span> {user.name}</p>
            <p><span>Email:</span> {user.email}</p>
            <p><span>Contact:</span> {user.contact}</p>
            <p><span>Location:</span> {user.location}</p>
            <p><span>Experience:</span> {user.experience}</p>
            <p><span>Company:</span> {user.currentCompany}</p>
          </div>
        )}

      </div>

    </div>
  );
}