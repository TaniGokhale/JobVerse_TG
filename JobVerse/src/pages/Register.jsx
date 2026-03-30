import { useState } from "react";
import API from "../services/api";
import "../styles/auth.css"
export default function Register() {
  const [data, setData] = useState({
    role: "user"
  });

  const [resume, setResume] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const register = async () => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      if (resume) formData.append("resume", resume);
      if (profilePic) formData.append("profilePic", profilePic);

      const res = await API.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="form-container">

      <h2>Create Account</h2>

      <select onChange={e => setData({...data, role: e.target.value})}>
        <option value="user">Candidate</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <input placeholder="Full Name"
        onChange={e => setData({...data, name: e.target.value})} />

      <input placeholder="Email"
        onChange={e => setData({...data, email: e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={e => setData({...data, password: e.target.value})} />

      <input placeholder="Contact Number"
        onChange={e => setData({...data, contact: e.target.value})} />

      <input placeholder="Location"
        onChange={e => setData({...data, location: e.target.value})} />

      {data.role === "user" && (
        <>
          <input placeholder="Experience (years)"
            onChange={e => setData({...data, experience: e.target.value})} />

          <input placeholder="Current Company"
            onChange={e => setData({...data, currentCompany: e.target.value})} />

          <label>Upload Resume</label>
          <input type="file" onChange={e => setResume(e.target.files[0])} />
        </>
      )}

      {data.role === "recruiter" && (
        <>
          <input placeholder="Company Name"
            onChange={e => setData({...data, company: e.target.value})} />

          <input placeholder="Company Website"
            onChange={e => setData({...data, website: e.target.value})} />
        </>
      )}

      <label>Profile Picture</label>
      <input type="file" onChange={e => setProfilePic(e.target.files[0])} />

      <button className="btn" onClick={register}>Register</button>

    </div>
  );
}