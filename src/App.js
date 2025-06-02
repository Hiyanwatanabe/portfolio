import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar    from './components/Sidebar';
import About      from './components/About';
import Projects   from './components/Projects';
import Contact    from './components/Contact';
import './App.css';          // make sure you import the new CSS
import './index.css';

export default function App() {
  return (
    <div className="layout-wrapper">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/"         element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="*"         element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
