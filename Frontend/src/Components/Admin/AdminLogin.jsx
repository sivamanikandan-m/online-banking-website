import React, { useEffect, useState } from "react";
import "./AdminLogin.css"
import MainNavbar from '../MainNavbar'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AdminLogin = () => {

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
  var navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    try {
          let response= await axios.post("http://localhost:8081/admin/login",formData);
          toast.success("Login successful...!");
          localStorage.setItem("admin",JSON.stringify(response.data))


          
          setTimeout(()=>{
            navigate("/dashboard/admin")
          },1000)
    } catch (error) {
      toast.error("Invalid Credentials...!")
    }    
    
  };

  return (
    <div>
        <MainNavbar/>
    <div className="admin-login-container">
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="admin-login-box" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" name="aUsername" value={formData.aUsername} onChange={handleChange} required />

          <label htmlFor="password">Password:</label>
          <input type="password" name="aPassword" value={formData.aPassword} onChange={handleChange} required />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default AdminLogin
