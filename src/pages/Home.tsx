import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HeroLanes, PaceRail } from "../components/HeroLanes";
import { ArrowRight, ArrowUpRight, Copy, Download, Expand, GitHub, LinkedIn, Mail, Phone } from "../components/Icons";
import { LaneLabel } from "../components/LaneLabel";
import { ProjectPreview } from "../components/ProjectVisual";
import { StackExplorer } from "../components/StackExplorer";
import { athletics, certifications, education, splits } from "../data/education";
import { experience } from "../data/experience";
import { about, contact, profile } from "../data/profile";
import { getProject, projects, type Project } from "../data/projects";
import { skillGroups } from "../data/skills";
import { useMeta, useReveal } from "../hooks";
import diploma from "../assets/img/diploma-484.webp";
import portrait480 from "../assets/img/portrait-480.webp";
import portrait760 from "../assets/img/portrait-760.webp";
import portrait960 from "../assets/img/portrait-960.webp";
import swim720 from "../assets/img/swim-fly-720.webp";
import swim1280 from "../assets/img/swim-fly-1280.webp";
import medal520 from "../assets/img/swim-medal-520.webp";
import medal860 from "../assets/img/swim-medal-860.webp";

const resumeHref = `${import.meta.env.BASE_URL}${profile.resume}`;

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroLanes />
      <div className="container">
        <div className="hero-grid">
          <div>
            <p className="hero-eyebrow mono">
              <span className="dot" aria-hidden /> {profile.location} · from {profile.origin}
            </p>
            <h1 id="hero-title">
              Hiyan <span className="last">Kubagawa</span>
            </h1>
            <p className="hero-roles">
              {profile.roles[0]} <span className="amp serif">&amp;</span> <span className="nowrap">{profile.roles[1]}</span>
            </p>
            <ul className="hero-specialties mono" aria-label="Specialties">
              {profile.specialties.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="hero-statement">{profile.headline}</p>
            <p className="hero-lede">{profile.lede}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#work">
                Explore my work <ArrowRight />
              </a>
              <a className="btn" href={resumeHref} target="_blank" rel="noopener">
                <Download /> Download resume
              </a>
              <a className="btn" href="#contact">
                <Mail /> Contact me
              </a>
            </div>
          </div>
          <figure className="portrait">
            <div className="portrait-ticks" aria-hidden>
              {Array.from({ length: 21 }, (_, i) => <i key={i} />)}
            </div>
            <div className="portrait-frame">
              <img
                src={portrait760}
                srcSet={`${portrait480} 480w, ${portrait760} 760w, ${portrait960} 960w`}
                sizes="(max-width: 960px) 92vw, 440px"
                width={760}
                height={943}
                alt="Portrait of Hiyan Kubagawa in a navy suit"
                fetchPriority="high"
              />
              <figcaption className="portrait-caption mono">
                <span>Engineer · Sysadmin</span>
                <span>Cleveland, OH</span>
              </figcaption>
            </div>
          </figure>
        </div>
        <PaceRail />
        <ul className="proof" aria-label="At a glance">
          {profile.credentials.map((c) => (
            <li key={c.label}>
              <span className="mono">{c.label}</span>
              <span>{c.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stack() {
  const ref = useReveal<HTMLElement>();
  return (
    <section className="section" id="stack" ref={ref} aria-labelledby="stack-title">
      <div className="container">
        <LaneLabel n="01">From interface to infrastructure</LaneLabel>
        <div className="section-head reveal">
          <h2 id="stack-title">
            Both sides of the application, and the <span className="serif">systems</span> under it.
          </h2>
          <p>
            I build what people use and I run what it runs on. Pick a layer to see what I do there, the tools I
            reach for, and the work that shows it.
          </p>
        </div>
        <div className="reveal">
          <StackExplorer />
        </div>
      </div>
    </section>
  );
}

function WorkCard({ p }: { p: Project }) {
  return (
    <article className="work-card reveal" aria-labelledby={`wc-${p.slug}`}>
      <Link to={`/work/${p.slug}`} className="work-card-visual" tabIndex={-1} aria-hidden>
        <ProjectPreview project={p} />
      </Link>
      <div className="work-card-body">
        <span className="mono muted">{p.period} · {p.role}</span>
        <h3 id={`wc-${p.slug}`}>
          <Link to={`/work/${p.slug}`}>{p.title}</Link>
        </h3>
        <p className="work-kicker">{p.kicker}</p>
        <p>{p.summary}</p>
        <Link className="link-arrow" to={`/work/${p.slug}`}>
          Role &amp; scope <ArrowRight />
        </Link>
      </div>
    </article>
  );
}

function Work() {
  const ref = useReveal<HTMLElement>();
  const tf4 = getProject("tf4")!;
  const professional = projects.filter((p) => p.confidential);
  const cognisense = getProject("cognisense")!;
  const more = projects.filter((p) => p.context !== "Professional" && p.slug !== "cognisense");
  return (
    <section className="section" id="work" ref={ref} aria-labelledby="work-title">
      <div className="container">
        <LaneLabel n="02">Selected work</LaneLabel>
        <div className="section-head reveal">
          <h2 id="work-title">Systems I've built, run and studied</h2>
          <p>
            TF4 is shown in depth: architecture, patterns and code. My other professional work is described by
            role, domains and technology. Research and personal projects go all the way down to the code.
          </p>
        </div>

        <div className="work-group">
          <div className="work-group-head reveal">
            <h3 className="mono">Professional · National Sales Partners</h3>
            <span className="chip chip-gold">TF4 in depth · others at domain level</span>
          </div>
          <article className="work reveal" aria-labelledby="w-tf4">
            <Link to="/work/tf4" className="work-visual" tabIndex={-1} aria-hidden>
              <span className="chip tag">Architecture</span>
              <ProjectPreview project={tf4} />
            </Link>
            <div className="work-body">
              <div className="work-meta mono">
                <span>{tf4.context}</span>
                <span>{tf4.period}</span>
                <span>{tf4.role}</span>
              </div>
              <h3 id="w-tf4">
                <Link to="/work/tf4">{tf4.title}</Link>
              </h3>
              <p className="work-kicker">{tf4.kicker}</p>
              <p>{tf4.summary}</p>
              <div className="chips">
                {tf4.stack.slice(0, 8).map((s) => (
                  <span className="chip" key={s}>{s}</span>
                ))}
              </div>
              <Link className="link-arrow" to="/work/tf4">
                Architecture, patterns &amp; code <ArrowRight />
              </Link>
            </div>
          </article>
          <div className="work-grid work-grid-3">
            {professional.map((p) => (
              <WorkCard key={p.slug} p={p} />
            ))}
          </div>
        </div>

        <div className="work-group">
          <div className="work-group-head reveal">
            <h3 className="mono">Research &amp; independent</h3>
            <span className="chip chip-accent">Full technical depth</span>
          </div>
          <article className="work reveal" aria-labelledby="w-cognisense">
            <Link to="/work/cognisense" className="work-visual" tabIndex={-1} aria-hidden>
              <span className="chip tag">Screenshots</span>
              <ProjectPreview project={cognisense} />
            </Link>
            <div className="work-body">
              <div className="work-meta mono">
                <span>{cognisense.context}</span>
                <span>{cognisense.period}</span>
              </div>
              <h3 id="w-cognisense">
                <Link to="/work/cognisense">{cognisense.title}</Link>
              </h3>
              <p className="work-kicker">{cognisense.kicker}</p>
              <p>{cognisense.summary}</p>
              <div className="chips">
                {cognisense.stack.slice(0, 7).map((s) => (
                  <span className="chip" key={s}>{s}</span>
                ))}
              </div>
              <Link className="link-arrow" to="/work/cognisense">
                Read the case study <ArrowRight />
              </Link>
            </div>
          </article>
          <div className="more-grid">
            {more.map((p) => (
              <Link to={`/work/${p.slug}`} className="card reveal" key={p.slug}>
                <span className="mono muted">{p.context} · {p.period}</span>
                <h3>{p.title}</h3>
                <p className="work-kicker">{p.kicker}</p>
                <p>{p.summary}</p>
                <span className="chips">
                  {p.stack.slice(0, 4).map((s) => (
                    <span className="chip" key={s}>{s}</span>
                  ))}
                </span>
                <span className="link-arrow">Case study <ArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const ref = useReveal<HTMLElement>();
  return (
    <section className="section" id="experience" ref={ref} aria-labelledby="exp-title">
      <div className="container">
        <LaneLabel n="03">Experience</LaneLabel>
        <div className="section-head reveal">
          <h2 id="exp-title">How the work has grown</h2>
        </div>
        <div className="roles">
          {experience.map((e) => (
            <article className="role reveal" key={e.org}>
              <div className="role-when">
                <span className="mono">{e.period}</span>
                <span className="org">{e.org}</span>
                <span className="muted">{e.place}</span>
              </div>
              <div>
                <h3>{e.role}</h3>
                <p className="summary">{e.summary}</p>
                {e.capabilities && (
                  <ul className="capabilities">
                    {e.capabilities.map((c, i) => (
                      <li key={c.name}>
                        <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                        <h4>{c.name}</h4>
                        <p>{c.body}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {e.highlights && (
                  <ul className="bullets">
                    {e.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                )}
                <div className="chips">
                  {e.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
                </div>
                {e.projects && (
                  <div className="role-links">
                    {e.projects.map((slug) => (
                      <Link className="link-arrow" key={slug} to={`/work/${slug}`}>
                        {getProject(slug)?.title} <ArrowRight />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const ref = useReveal<HTMLElement>();
  const tiers = [
    ["production", "Used in production at work"],
    ["projects", "Hands-on in projects & labs"],
    ["foundations", "Foundations / coursework"],
  ] as const;
  return (
    <section className="section" id="skills" ref={ref} aria-labelledby="skills-title">
      <div className="container">
        <LaneLabel n="04">Toolkit</LaneLabel>
        <div className="section-head reveal">
          <h2 id="skills-title">What I reach for, and how well I know it</h2>
          <p>No percentages. Three honest tiers, and the work that shows each group.</p>
        </div>
        <div className="skills-legend reveal">
          {tiers.map(([t, label]) => (
            <span key={t}>
              <i className={`tier-dot tier-${t}`} aria-hidden /> {label}
            </span>
          ))}
        </div>
        <div className="skill-table">
          {skillGroups.map((g) => (
            <div className="skill-row reveal" key={g.title}>
              <div className="skill-head">
                <h3>{g.title}</h3>
                <p className="skill-evidence">
                  <span className="mono">Seen in</span>
                  {g.evidence.map((slug) => (
                    <Link key={slug} to={`/work/${slug}`}>{getProject(slug)?.title}</Link>
                  ))}
                </p>
              </div>
              <ul className="skill-items" aria-label={g.title}>
                {tiers.flatMap(([t, label]) =>
                  g[t].map((s) => (
                    <li className="skill" data-tier={t} key={s}>
                      {s}
                      <span className="visually-hidden"> ({label})</span>
                    </li>
                  )),
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const ref = useReveal<HTMLElement>();
  return (
    <section className="section" id="about" ref={ref} aria-labelledby="about-title">
      <div className="container">
        <LaneLabel n="05">About</LaneLabel>
        <div className="about-grid">
          <div className="about-text reveal">
            <h2 id="about-title">{about.title}</h2>
            {about.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            <div className="languages" aria-label="Languages">
              {profile.languages.map((l) => (
                <div key={l.name}>
                  <span>{l.name}</span>
                  <span>{l.level}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-photo reveal">
            <figure>
              <img
                src={swim1280}
                srcSet={`${swim720} 720w, ${swim1280} 1280w`}
                sizes="(max-width: 860px) 92vw, 560px"
                width={1280}
                height={853}
                loading="lazy"
                decoding="async"
                alt="Hiyan swimming butterfly for Gannon University, between lane ropes"
              />
            </figure>
            <figcaption>Butterfly, Gannon University · NCAA Division II</figcaption>
            <div className="quote">
              <blockquote>“{about.quote.text}”</blockquote>
              <cite>— Hiyan, {about.quote.source}</cite>
            </div>
          </div>
        </div>

        <div className="splits">
          <LaneLabel n="05b">Splits</LaneLabel>
          <ol className="splits-track">
            {splits.map((s) => (
              <li className="split reveal" key={s.title}>
                <span className="time">{s.time}</span>
                <span className="mark">{s.mark}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function DiplomaViewer() {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <figure className="diploma">
        <button type="button" className="diploma-frame" onClick={() => dialog.current?.showModal()} aria-haspopup="dialog">
          <img src={diploma} width={484} height={285} alt="Gannon University diploma conferring a Bachelor of Science in Computer Science, Cum Laude, on Hiyan Otavio Watanabe Kubagawa, May 10, 2025" loading="lazy" decoding="async" />
          <span className="diploma-cta mono">
            <Expand /> View credential
          </span>
        </button>
        <figcaption className="mono">Conferred May 10, 2025 · preview cropped for privacy</figcaption>
      </figure>
      <dialog ref={dialog} className="lightbox" aria-label="Diploma" onClick={(e) => e.target === dialog.current && dialog.current?.close()}>
        <div className="lightbox-inner">
          <img src={diploma} width={484} height={285} alt="Gannon University diploma, Bachelor of Science in Computer Science, Cum Laude, May 2025" />
          <div className="lightbox-bar">
            <span className="mono">Gannon University · B.S. Computer Science · Cum Laude · 2025</span>
            <button type="button" className="btn" onClick={() => dialog.current?.close()} autoFocus>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

function Credentials() {
  const ref = useReveal<HTMLElement>();
  return (
    <section className="section" id="education" ref={ref} aria-labelledby="edu-title">
      <div className="container">
        <LaneLabel n="06">Education, credentials &amp; athletics</LaneLabel>
        <h2 id="edu-title" className="visually-hidden">Education, credentials and athletics</h2>
        <div className="cred-grid">
          <div className="panel panel-edu reveal">
            <div className="edu-text">
              <span className="mono">Education</span>
              <h3>{education.school}</h3>
              <p className="edu-degree">
                {education.degree}
                <span className="edu-distinction serif"> {education.distinction}</span>
              </p>
              <dl>
                <dt>Graduated</dt><dd>{education.graduated}</dd>
                <dt>GPA</dt><dd>{education.gpa} · {education.honors.join(", ")}</dd>
                <dt>Where</dt><dd>{education.place}</dd>
                <dt>Athletics</dt><dd>NCAA Division II swimmer</dd>
              </dl>
              <div className="chips">
                {education.coursework.map((c) => <span className="chip" key={c}>{c}</span>)}
              </div>
            </div>
            <DiplomaViewer />
          </div>
          <div className="panel panel-cert reveal">
            <span className="mono">Certifications</span>
            {certifications.map((c) => (
              <div className="cert" key={c.name}>
                <strong>{c.name}</strong>
                <span>{c.issuer} · {c.date}{c.note ? ` · ${c.note}` : ""}</span>
              </div>
            ))}
          </div>
          <div className="panel panel-ath reveal">
            <span className="mono">{athletics.level}</span>
            <div className="athlete-photo">
              <img
                src={medal520}
                srcSet={`${medal520} 520w, ${medal860} 860w`}
                sizes="(max-width: 960px) 92vw, 360px"
                width={520}
                height={562}
                loading="lazy"
                decoding="async"
                alt="Hiyan in a Gannon Swimming & Diving jacket wearing a PSAC championship medal"
              />
            </div>
            <h3>{athletics.program}</h3>
            {athletics.records.map((r) => (
              <div className="record" key={r.event}>
                <span>{r.event}</span>
                <span className="chip">{r.note}</span>
              </div>
            ))}
            <p className="muted">{athletics.honors.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CopyEmail() {
  const [state, setState] = useState<"idle" | "done" | "fail">("idle");
  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2200);
    return () => clearTimeout(t);
  }, [state]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setState("done");
    } catch {
      setState("fail");
    }
  };
  return (
    <button type="button" className="btn" onClick={copy}>
      <Copy /> {state === "done" ? "Copied" : state === "fail" ? "Copy failed" : "Copy email"}
      <span className="visually-hidden" role="status">{state === "done" ? "Email address copied" : ""}</span>
    </button>
  );
}

function Contact() {
  const ref = useReveal<HTMLElement>();
  return (
    <section className="section contact" id="contact" ref={ref} aria-labelledby="contact-title">
      <div className="container">
        <LaneLabel n="07">Contact</LaneLabel>
        <h2 id="contact-title" className="reveal">{contact.title}</h2>
        <p className="contact-body reveal">{contact.body}</p>
        <div className="contact-lines reveal">
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email} <ArrowUpRight />
          </a>
          <a className="contact-phone" href={profile.phoneHref}>
            <Phone /> {profile.phone}
          </a>
        </div>
        <div className="contact-links reveal">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            <Mail /> Get in touch
          </a>
          <CopyEmail />
          <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedIn /> LinkedIn</a>
          <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer"><GitHub /> GitHub</a>
          <a className="btn" href={resumeHref} target="_blank" rel="noopener"><Download /> Resume (PDF)</a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useMeta(
    "Hiyan Kubagawa · Full-Stack Software Engineer & Systems Administrator",
    "Hiyan Kubagawa is a full-stack software engineer and systems administrator in Cleveland, Ohio, building web applications, integrations and automation with Python, SQL, React, AWS and Linux.",
  );
  return (
    <>
      <Hero />
      <Stack />
      <Work />
      <Experience />
      <Skills />
      <About />
      <Credentials />
      <Contact />
    </>
  );
}
