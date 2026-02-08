import React from 'react';
import './MainNavbar.css';
import { FaYoutube, FaLinkedin } from 'react-icons/fa';

const MainNavbar = () => {
  return (
    <nav className="main-navbar">
      <div className="bank-name">Modern Bank</div>
      <div className="social-icons">
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>
    </nav>
  );
};

export default MainNavbar;
