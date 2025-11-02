import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout(); // Updates App state and clears token
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="brand" onClick={() => navigate("/movies")}>
          🎬 CinePass
        </h1>

        {/* Desktop Links */}
        <div className="nav-links desktop">
          <Link to="/movies">Movies</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </div>
      </div>

      {/* Desktop Logout Button */}
      <button className="logout-btn desktop" onClick={handleLogout}>
        Logout
      </button>

      {/* Hamburger Icon */}
      <div
        className={`menu-icon ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/movies" onClick={closeMenu}>
          Movies
        </Link>
        <Link to="/my-bookings" onClick={closeMenu}>
          My Bookings
        </Link>
        <button
          className="logout-btn"
          onClick={() => {
            closeMenu();
            handleLogout();
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
