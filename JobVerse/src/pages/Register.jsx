import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [data, setData] = useState({});
  const [resume, setResume] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const register = async () => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    formData.append("resume", resume);
    formData.append("profilePic", profilePic);

    const res = await API.post("/auth/register", formData);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    window.location.href = "/dashboard";
  };

  return (
    <div className="card">
      <h2>Create Profile</h2>

      <input placeholder="Name" onChange={e => setData({...data, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setData({...data, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})} />

      <input placeholder="Contact" onChange={e => setData({...data, contact: e.target.value})} />
      <input placeholder="Location" onChange={e => setData({...data, location: e.target.value})} />
      <input placeholder="Experience" onChange={e => setData({...data, experience: e.target.value})} />
      <input placeholder="Current Company" onChange={e => setData({...data, currentCompany: e.target.value})} />

      <label>Resume</label>
      <input type="file" onChange={e => setResume(e.target.files[0])} />

      <label>Profile Pic</label>
      <input type="file" onChange={e => setProfilePic(e.target.files[0])} />

      <button className="btn" onClick={register}>Register</button>
    </div>
  );
}