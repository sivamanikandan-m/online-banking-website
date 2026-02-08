import React, { useState } from "react";
import './UserRegister.css';
import MainNavbar from '../MainNavbar';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast ,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  var navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response= await axios.post('http://localhost:8081/user/register',formData);
      if(response.status===202){
      toast.success(response.data)
      }

      setTimeout(()=>{
            navigate("/")
          },1000)

    } catch (error) {
      toast.warn(error.response.data)
    }
    setFormData({
    userName: "",
    password: "",
  });
    
  };

  return (
    <div>
        <MainNavbar/>
    <div className="register-container">
      <ToastContainer position="top-right" autoClose={3000}/>
      <div className="register-box" onSubmit={handleSubmit}>
        <h2>Register a New Account</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />

          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <button type="submit">Register</button>
        </form>
        <p className="login-text">
          Already have an account? <a href="/">Login here</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default UserRegister;
