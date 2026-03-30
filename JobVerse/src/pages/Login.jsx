import { useState } from "react";
import API from "../services/api";
import "../styles/auth.css"

export default function Login() {
  const [data, setData] = useState({});

  const login = async () => {
    try {
      const res = await API.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="form-container">

      <h2>Login</h2>

      <input placeholder="Email"
        onChange={e => setData({...data, email: e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={e => setData({...data, password: e.target.value})} />

      <button className="btn" onClick={login}>Login</button>

    </div>
  );
}