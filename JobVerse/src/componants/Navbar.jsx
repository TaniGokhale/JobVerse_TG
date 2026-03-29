import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar">

      <h2 className="logo">JobVerse</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}

        {user && user.role === "user" && (
          <Link to="/dashboard">Dashboard</Link>
        )}

        {user && user.role === "recruiter" && (
          <Link to="/dashboard">Recruiter</Link>
        )}

        {user && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>

    </div>
  );
}