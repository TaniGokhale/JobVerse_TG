import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="navbar">
      <h2>JobVerse</h2>

      <div>
        <Link to="/">Home</Link>

        {!user && <Link to="/login"> Login </Link>}
        {!user && <Link to="/register"> Register </Link>}

        {user && <Link to="/dashboard"> Dashboard </Link>}

        {user && (
          <button onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}