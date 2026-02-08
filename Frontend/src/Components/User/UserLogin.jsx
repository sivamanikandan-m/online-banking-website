import React, { useState } from "react";
import './UserLogin.css';
import { Link, useNavigate } from "react-router-dom";
import MainNavbar from '../MainNavbar';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const UserLogin = () => {
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/user/login",
        null,
        {
          params: {
            userName: formData.userName,
            password: formData.password,
          },
        }
      );
      toast.success("Login successfull...");
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setFormData({
        userName: "",
        password: "",
      });
      navigate("/dashboard/user");
    } catch (error) {

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data;

      if (status === 417) {
        toast.error(message); // inactive user
      } 
      else if (status === 401) {
        toast.error(message); // wrong password
      } 
      else if (status === 404) {
        toast.error(message); // user not found
      } 
      else {
        toast.error("Something went wrong!");
      }
    } else {
      toast.error("Server not reachable!");
    }
  }
  };

  return (
    <div>
        <MainNavbar/>
    <div className="login-container">
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />

          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <button type="submit">Login</button>
        </form>
        <p className="register-text">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default UserLogin;
