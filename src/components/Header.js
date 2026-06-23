import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored login data if needed
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="header">
      <h1 className="header-title">Notes App</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
