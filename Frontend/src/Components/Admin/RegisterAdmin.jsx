import React, { useState } from "react";
import "./RegisterAdmin.css"
import AdminNavbar from './AdminNavbar'
import { Link } from "react-router-dom";
import axios from "axios";
import { toast ,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RegisterAdmin = () => {
  
  const [formData, setFormData] = useState({
    aUsername: "",
    aPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response= await axios.post('http://localhost:8081/admin/register',formData);
      if(response.status===201){
      toast.success(response.data)
      }
    } catch (error) {
      toast.warn(error.response.data)
    }
    setFormData({
    aUsername: "",
    aPassword: "",
  });
    
  };

  return (
    <div>
        <AdminNavbar/>
    <div className="admin-register-container">
      <ToastContainer position="top-right" autoClose={1000}/>
      <div className="admin-register-box" onSubmit={handleSubmit}>
        <h2>Register Admin</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" name="aUsername" value={formData.aUsername} onChange={handleChange} required />

          <label htmlFor="password">Password:</label>
          <input type="password" name="aPassword" value={formData.aPassword} onChange={handleChange} required />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default RegisterAdmin
