import { Link, useNavigate } from "react-router-dom";

function Navbar({ token, setToken, theme, setTheme }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/">
       <div className="navbar-brand">TaskNest</div>
      </Link>
      <ul className="navbar-links">
        {!token && (
          <>
            <li>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </>
        )}
        {token && (
          <>
            <li>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
            <li>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      <li>
    <button
      className="btn-theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  </li>
</ul>
    </nav>
  );
}

export default Navbar;