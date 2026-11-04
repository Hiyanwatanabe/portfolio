import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { profile } from "../data/profile";
import { useActiveSection } from "../hooks";
import { Download } from "./Icons";

const nav = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function BrandMark() {
  // Two lane ropes and the T at the wall; reads as an "H".
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden>
      <rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="none" stroke="rgb(148 170 195 / .3)" />
      <g stroke="#6fd6c9" strokeWidth="2" strokeLinecap="round">
        <path d="M10 9v14M22 9v14M10 16h12" />
      </g>
      <g stroke="rgb(148 170 195 / .55)" strokeWidth="1.4" strokeLinecap="round">
        <path d="M7 9h6M7 23h6M19 9h6M19 23h6" />
      </g>
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome ? nav.map((n) => n.id) : []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container bar">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <BrandMark />
          <span>
            Hiyan Kubagawa
            <small>Full-stack · Systems · Automation</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
        </button>
        <nav id="site-nav" className="nav" data-open={open} aria-label="Primary">
          {nav.map((n) => (
            <Link
              key={n.id}
              to={{ pathname: "/", hash: `#${n.id}` }}
              aria-current={active === n.id ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <a className="btn" href={`${import.meta.env.BASE_URL}${profile.resume}`} target="_blank" rel="noopener">
            <Download /> Resume
          </a>
        </nav>
      </div>
    </header>
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView());
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">
          <span>© {new Date().getFullYear()} {profile.fullName}</span>
          <span className="footer-links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.phoneHref}>{profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </span>
          <span className="mono">Built with React, TypeScript &amp; Vite</span>
        </div>
      </footer>
    </>
  );
}
