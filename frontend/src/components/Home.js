import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home-card">
        <h1>Welcome to <span className="highlight">Team 404</span> 🎓</h1>
        <p className="home-text">
          Welcome to the student team members management appication!!
          Add, view, and update members with ease.
        </p>
        <div className="home-actions">
          <Link to="/add">
            <button className="home-btn add">➕ Add Member</button>
          </Link>
          <Link to="/view">
            <button className="home-btn view">👥 View Members</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

