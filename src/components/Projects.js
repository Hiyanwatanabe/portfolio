import React from 'react';
import './Projects.css';

export default function Projects() {
  return (
    <div className="projects-section">
      <h2>Projects</h2>
      <ul>
        <li>
          <strong>Cognisense (Lockheed Martin):</strong> Led front-end React architecture,  
          API integration, and optimized Python signal pipelines for a live cognitive-load tool.
        </li>
        {/* add more projects here */}
      </ul>
    </div>
  );
}
