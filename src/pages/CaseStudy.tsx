import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Info } from "../components/Icons";
import { cognisenseShots, ProjectDiagram } from "../components/ProjectVisual";
import type { ConfidentialProject, PublicProject } from "../data/projects";
import { projects } from "../data/projects";
import { useActiveSection, useMeta, useReveal } from "../hooks";
import { SpecVisual } from "../visuals/SpecVisual";
import NotFound from "./NotFound";

const publicSections = [
  { id: "problem", label: "The problem" },
  { id: "architecture", label: "Architecture" },
  { id: "approach", label: "Approach" },
  { id: "built", label: "What was built" },
  { id: "challenges", label: "Hard parts" },
  { id: "outcome", label: "Outcome" },
];
const confidentialSections = [
  { id: "role", label: "My role" },
  { id: "domains", label: "Domains & stack" },
  { id: "principles", label: "How I approach it" },
];

function ConfidentialBody({ p }: { p: ConfidentialProject }) {
  return (
    <>
      <section className="cs-section reveal" id="role" aria-labelledby="h-role">
        <h2 id="h-role">My role</h2>
        <ul className="bullets bullets-lg">
          {p.responsibilities.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </section>

      <section className="cs-section reveal" id="domains" aria-labelledby="h-dom">
        <h2 id="h-dom">Domains &amp; stack</h2>
        <figure className="cs-figure">
          <div className="figure-body figure-body-spec">
            <SpecVisual title={p.title} domains={p.domains} stack={p.stack} />
          </div>
          <figcaption>
            <span>Domain map: the kinds of engineering involved, not a system diagram</span>
          </figcaption>
        </figure>
        <ul className="chips" style={{ marginTop: "1.5rem" }} aria-label="Engineering domains">
          {p.domains.map((d) => <li className="chip chip-accent" key={d}>{d}</li>)}
        </ul>
        <ul className="chips" style={{ marginTop: "0.6rem" }} aria-label="Technologies">
          {p.stack.map((s) => <li className="chip" key={s}>{s}</li>)}
        </ul>
      </section>

      <section className="cs-section reveal" id="principles" aria-labelledby="h-pr">
        <h2 id="h-pr">How I approach this kind of work</h2>
        <div className="challenge-grid">
          {p.principles.map((c) => (
            <div className="challenge" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function PublicBody({ p }: { p: PublicProject }) {
  return (
    <>
      <section className="cs-section reveal" id="problem" aria-labelledby="h-problem">
        <h2 id="h-problem">The problem</h2>
        <p>{p.problem}</p>
      </section>

      <section className="cs-section reveal" id="architecture" aria-labelledby="h-arch">
        <h2 id="h-arch">Architecture</h2>
        <figure className="cs-figure">
          <div className="figure-body" tabIndex={0} role="region" aria-label="Architecture diagram">
            <ProjectDiagram project={p} />
          </div>
          <figcaption>
            <span>System overview, simplified</span>
            <span className="mono">
              {p.stack.slice(0, 3).join(" · ")}
              <span className="scroll-hint"> · scroll →</span>
            </span>
          </figcaption>
        </figure>
      </section>

      <section className="cs-section reveal" id="approach" aria-labelledby="h-approach">
        <h2 id="h-approach">Approach</h2>
        <div className="cs-prose">
          {p.approach.map((a) => <p key={a.slice(0, 30)}>{a}</p>)}
        </div>
      </section>

      <section className="cs-section reveal" id="built" aria-labelledby="h-built">
        <h2 id="h-built">What was built</h2>
        <ul className="feature-grid">
          {p.features.map((f, i) => (
            <li key={f}>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
        {p.image === "cognisense" && (
          <div className="gallery" style={{ marginTop: "2rem" }}>
            {cognisenseShots.map((s) => (
              <figure key={s.alt}>
                <img src={s.src} width={s.w} height={s.h} alt={s.alt} loading="lazy" decoding="async" />
                <figcaption>{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
        <div className="chips" style={{ marginTop: "2rem" }}>
          {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
        </div>
      </section>

      <section className="cs-section reveal" id="challenges" aria-labelledby="h-ch">
        <h2 id="h-ch">The hard parts</h2>
        <div className="challenge-grid">
          {p.challenges.map((c) => (
            <div className="challenge" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cs-section reveal" id="outcome" aria-labelledby="h-out">
        <h2 id="h-out">Outcome</h2>
        <ul className="outcomes">
          {p.outcomes.map((o) => <li key={o}>{o}</li>)}
        </ul>
      </section>
    </>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const p = projects[index];
  const ref = useReveal<HTMLDivElement>();
  const sections = p?.confidential ? confidentialSections : publicSections;
  const active = useActiveSection(p ? sections.map((s) => s.id) : []);
  useMeta(
    p ? `${p.title}: ${p.kicker} · Hiyan Kubagawa` : "Not found · Hiyan Kubagawa",
    p ? p.summary : "This page does not exist.",
    p ? `work/${p.slug}` : "",
  );
  if (!p) return <NotFound />;

  const next = projects[(index + 1) % projects.length];

  return (
    <div ref={ref} key={p.slug}>
      <header className="cs-hero container">
        <Link to={{ pathname: "/", hash: "#work" }} className="back-link">
          <ArrowRight /> All work
        </Link>
        <p className="cs-kicker">{p.kicker}</p>
        <h1>{p.title}</h1>
        <p className="cs-summary">{p.summary}</p>
        <dl className="cs-facts">
          <div><dt>Context</dt><dd>{p.context} · {p.org}</dd></div>
          <div><dt>Role</dt><dd>{p.role}</dd></div>
          <div><dt>Period</dt><dd>{p.period}</dd></div>
          <div><dt>Stack</dt><dd>{p.stack.slice(0, 5).join(", ")}</dd></div>
        </dl>
        {p.confidential && (
          <div className="disclosure" style={{ marginTop: "2rem" }}>
            <Info />
            <span>
              This is work for my employer. Its design, data and the business it supports are confidential, so this
              page covers my role, the engineering domains and the technologies involved, not how the system works.
              I'm happy to talk through the engineering in an interview, within those limits.
            </span>
          </div>
        )}
        {p.links && (
          <div className="contact-links">
            {p.links.map((l) => (
              <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} <ArrowUpRight />
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="container cs-body">
        <nav className="cs-toc" aria-label="On this page">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>
              {s.label}
            </a>
          ))}
        </nav>
        <div className="cs-content">{p.confidential ? <ConfidentialBody p={p} /> : <PublicBody p={p} />}</div>
      </div>

      <div className="cs-next">
        <div className="container">
          <Link to={`/work/${next.slug}`}>
            <span className="mono">Next</span>
            <strong>{next.title} →</strong>
            <span className="muted">{next.kicker}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
