// src/components/Contact.js
import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaPhone } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-section">
      <h2>Contact</h2>

      {/* Email line */}
      <p className="contact-item">
        <FaEnvelope />  
        <a href="mailto:you@example.com">watanabe001@gannon.edu</a>
      </p>
      {/* Phone */}
      <p className="contact-item">
        <FaPhone/>
         <a href="tel:+11234567890">(814) 218-6777</a>
      </p>

      {/* Icon‐enhanced LinkedIn & GitHub */}
      <div className="contact-item contact-links">
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
    </div>
  );
}
