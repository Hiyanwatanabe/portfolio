// src/components/MainContent.js
import React from 'react';
import About    from './About';
import Projects from './Projects';
import Contact  from './Contact';
import './MainContent.css';

export default function MainContent() {
  return (
    <main className="main-content">
      <section id="about">
        <About />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
