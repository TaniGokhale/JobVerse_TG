import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const register = async () => {
    try {
      console.log(data);

      const res = await API.post("/auth/register", data);

      alert("Registered Successfully");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/";

    } catch (err) {
      console.log(err.response);
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="form-box card">
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={e => setData({ ...data, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <select
        onChange={e => setData({ ...data, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <button className="btn" onClick={register}>
        Register
      </button>
    </div>
  );
}