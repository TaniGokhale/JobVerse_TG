import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [data, setData] = useState({});

  const login = async () => {
    const res = await API.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    window.location.href = "/";
  };

  return (
    <div className="form-box card">
      <h2 className="center">Login</h2>
      <input placeholder="Email" onChange={e => setData({...data, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})} />
      <button className="btn">Login</button>
    </div>
  );
}