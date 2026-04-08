import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const navigate = useNavigate();

  // 🔥 load user
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  // 🔥 load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      setDark(true);
    }
  }, []);

  // 🔥 toggle theme
  const toggleTheme = () => {
    if (dark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const notifications = [
    "Your application is under review",
    "New job posted for you",
    "Profile updated successfully"
  ];

  return (
    <div className="navbar">

      <h2 className="logo">JobVerse</h2>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>

        <Link to="/">Home</Link>

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}

        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>

            {/* 🔔 Notification */}
            <div className="notif-box">
              <div className="bell" onClick={() => setShowNotif(!showNotif)}>
                🔔
                <span className="badge">{notifications.length}</span>
              </div>

              {showNotif && (
                <div className="notif-dropdown">
                  {notifications.map((n, i) => (
                    <p key={i}>{n}</p>
                  ))}
                </div>
              )}
            </div>

            {/* 👤 Avatar */}
            <div className="avatar-box">
              <div className="avatar" onClick={() => setDropdown(!dropdown)}>
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {dropdown && (
                <div className="dropdown">
                  <p>{user.name}</p>
                  <p>{user.email}</p>

                  {/* 🌙 DARK MODE */}
                  {/* <button onClick={toggleTheme}>
                    {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
                  </button> */}

                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          </>
        )}

      </div>

      {/* ☰ MOBILE MENU */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

    </div>
  );
}