import { Link } from "react-router-dom";
import { ArrowRight, Download, LinkedIn, Mail } from "../components/Icons";
import { LaneLabel } from "../components/LaneLabel";
import { FlagPanel } from "../components/Flags";
import { profile } from "../data/profile";
import { story } from "../data/story";
import { useActiveSection, useMeta, useReveal } from "../hooks";
import { metaFor } from "../seo";
import swim720 from "../assets/img/swim-fly-720.webp";
import swim1280 from "../assets/img/swim-fly-1280.webp";
import portrait480 from "../assets/img/portrait-480.webp";
import portrait760 from "../assets/img/portrait-760.webp";

export default function About() {
  useMeta(metaFor("/about/"));
  const ref = useReveal<HTMLDivElement>();
  const active = useActiveSection(story.sections.map((s) => s.id));
  return (
    <div ref={ref}>
      <header className="cs-hero container about-hero">
        <Link to="/" className="back-link">
          <ArrowRight /> Home
        </Link>
        <p className="cs-kicker">{story.title}</p>
        <div className="about-hero-grid">
          <div>
            <h1>{story.intro}</h1>
            <p className="cs-summary">
              {profile.roles[0]} &amp; {profile.roles[1]} in {profile.location}. From São Paulo, by way of the pool,
              to production systems.
            </p>
          </div>
          <figure className="about-hero-photo">
            <img
              src={portrait760}
              srcSet={`${portrait480} 480w, ${portrait760} 760w`}
              sizes="(max-width: 860px) 60vw, 280px"
              width={760}
              height={943}
              alt="Portrait of Hiyan Kubagawa in a navy suit"
            />
          </figure>
        </div>
        <dl className="cs-facts">
          <div><dt>Based in</dt><dd>{profile.location}</dd></div>
          <div><dt>From</dt><dd>{profile.origin}</dd></div>
          <div><dt>Degree</dt><dd>B.S. Computer Science, Cum Laude</dd></div>
          <div><dt>Languages</dt><dd>Portuguese · English · Spanish</dd></div>
        </dl>
      </header>

      <div className="container cs-body">
        <nav className="cs-toc" aria-label="On this page">
          {story.sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>
              {s.heading}
            </a>
          ))}
        </nav>
        <div className="cs-content story">
          {story.sections.map((s, i) => (
            <section className="cs-section reveal" id={s.id} key={s.id} aria-labelledby={`h-${s.id}`}>
              <LaneLabel n={String(i + 1).padStart(2, "0")}>{s.heading}</LaneLabel>
              <h2 id={`h-${s.id}`} className="visually-hidden">{s.heading}</h2>
              <div className="cs-prose">
                {s.paragraphs.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
              </div>
              {"links" in s && s.links && (
                <div className="role-links">
                  {s.links.map((l) => (
                    <Link className="link-arrow" key={l.to} to={l.to}>
                      {l.label} <ArrowRight />
                    </Link>
                  ))}
                </div>
              )}
              {s.id === "background" && <FlagPanel />}
              {s.id === "background" && (
                <figure className="story-photo">
                  <img
                    src={swim1280}
                    srcSet={`${swim720} 720w, ${swim1280} 1280w`}
                    sizes="(max-width: 860px) 92vw, 760px"
                    width={1280}
                    height={853}
                    loading="lazy"
                    decoding="async"
                    alt="Hiyan swimming butterfly for Gannon University, between lane ropes"
                  />
                  <figcaption className="mono">Butterfly, Gannon University · NCAA Division II</figcaption>
                </figure>
              )}
            </section>
          ))}

          <p className="story-signoff reveal">{story.signoff}</p>

          <section className="cs-section reveal" aria-labelledby="h-facts">
            <h2 id="h-facts">In short</h2>
            <dl className="facts">
              {story.facts.map((f) => (
                <div key={f.q}>
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
            <div className="contact-links">
              <a className="btn btn-primary" href={`mailto:${profile.email}`}><Mail /> Email me</a>
              <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedIn /> LinkedIn</a>
              <a className="btn" href={`${import.meta.env.BASE_URL}${profile.resume}`} target="_blank" rel="noopener"><Download /> Résumé (PDF)</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
