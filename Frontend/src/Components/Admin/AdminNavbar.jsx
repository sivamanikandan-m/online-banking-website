import React from 'react'
import "./AdminNavbar.css"
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <nav className="main-navbar">
      <div className="bank-name">Modern Bank</div>
      <div className="nav-links">
        <a href="/dashboard/admin">Dashboard</a>
        <a href="/users/all">All Users</a>
        <a href="/transactions/all">All Transactions</a>
        <a href="/admins/all">All Admins</a>
        <a href="/registeradmin">Register Admin</a>
        <a onClick={handleLogout}>Logout</a>
      </div>
    </nav>
  )
}

export default AdminNavbar
