import { useState } from "react";
import API from "../services/api";

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
    <div className="card">
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <h2>My Profile</h2>
        <button className="btn" onClick={() => setEdit(!edit)}>
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

          <button className="btn" onClick={updateProfile}>Save</button>
        </>
      ) : (
        <>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Contact:</b> {user.contact}</p>
          <p><b>Location:</b> {user.location}</p>
          <p><b>Experience:</b> {user.experience}</p>
          <p><b>Company:</b> {user.currentCompany}</p>
        </>
      )}
    </div>
  );
}