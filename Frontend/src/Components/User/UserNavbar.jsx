import React from 'react'
import "./UserNavbar.css"
import { useNavigate, Link } from "react-router-dom";

const UserNavbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
     <nav className="main-navbar">
      <div className="bank-name">Modern Bank</div>
      <div className="nav-links">
        <Link to="/dashboard/user">Dashboard</Link>
        <Link to="/transactions/user">Transactions</Link>
        <span onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </span>
      </div>
    </nav>
  )
}

export default UserNavbar
