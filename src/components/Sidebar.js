// src/components/Sidebar.js
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';    // ← use NavLink for active styling
import './Sidebar.css';
import pic from '../assets/pic.jpg';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <img src={pic} alt="Hiyan Kubagawa" className="sidebar-photo" />
        <h1 className="brand-name">Hiyan Kubagawa</h1>
        <p className="brand-title">Software Engineer & Data Analyst</p>
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects">
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="social-links">
        <a
          href="https://www.linkedin.com/in/hiyan-kubagawa-/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin /> LinkedIn
        </a>
        <a
          href="https://github.com/Hiyanwatanabe"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub /> GitHub
        </a>
      </div>
    </aside>
  );
}
