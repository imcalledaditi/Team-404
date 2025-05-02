import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/styles.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo-icon">🎓</span>
        <Link to="/" className="navbar-title">
        Student Team Members Management Application
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/add" className={location.pathname === "/add" ? "active-link" : ""}>
          <button className="nav-btn add">➕ Add</button>
        </Link>
        <Link to="/view" className={location.pathname === "/view" ? "active-link" : ""}>
          <button className="nav-btn view">👥 View</button>
        </Link>
        <button className="nav-btn toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
