import React from "react";

const Navbar = ({ activeTab }) => {
  return (
    <nav className="nav-bar">
      <a
        href="#home"
        className={`nav-item ${activeTab === "home" ? "active" : ""}`}
      >
        <i className="fas fa-home"></i>
        <div>باش بەت</div>
      </a>
      <a
        href="#habits"
        className={`nav-item ${activeTab === "habits" ? "active" : ""}`}
      >
        <i className="fas fa-list"></i>
        <div>ئادەتلەر</div>
      </a>
      <a
        href="#stats"
        className={`nav-item ${activeTab === "stats" ? "active" : ""}`}
      >
        <i className="fas fa-chart-bar"></i>
        <div>ستاتىستىكا</div>
      </a>
      <a
        href="#profile"
        className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
      >
        <i className="fas fa-user"></i>
        <div>مېنىڭ</div>
      </a>
    </nav>
  );
};

export default Navbar;
