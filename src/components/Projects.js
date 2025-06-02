import React, { useRef, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

// Make sure these paths match where you’ve put your images
import dashboardImg from '../assets/Dashboard1.png';
import reportImg    from '../assets/Report1.png';

export default function Projects() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="projects-section">
      <h2>CogniSense: Real-Time Cognitive Load Measurement</h2>

      <p>
        A next-generation cognitive-load platform that blends live facial-expression
        tracking, EEG brain-wave sensing, and NASA TLX surveys into one seamless
        experience. Engineers get real-time visualizations of mental workload—
        softer on the eyes, sharper on the insights. Originally built for
        Lockheed Martin human-factors research, CogniSense is ready to scale
        across healthcare, education, pilot training, and beyond.
      </p>

      <div className="project-images">
      <img
      src={dashboardImg}
      alt="Dashboard"
      className="project-image--wide"
      />
      <img
      src={reportImg}
      alt="Report"
      />
      </div>


      <div className="project-links">
        <a
          href="https://github.com/Hiyanwatanabe/Cognisense-LockHeed"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View CogniSense on GitHub"
        >
          <FaGithub /> View on GitHub
        </a>

        <a
          href="https://lockheed-cognisense.web.app/dashboard/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View CogniSense Faculty Dashboard"
        >
          <FaExternalLinkAlt /> Faculty Dashboard
        </a>

        <a
          href="https://lockheed-cognisense.web.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit CogniSense Official Website"
        >
          <FaExternalLinkAlt /> Official Website
        </a>
      </div>
    </section>
  );
}
