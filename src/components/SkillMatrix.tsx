import { Link } from "react-router-dom";
import { getProject } from "../data/projects";
import { skillGroups } from "../data/skills";

const tiers = [
  { key: "production", label: "Used in production", short: "PROD", level: 3 },
  { key: "projects", label: "Hands-on in projects & labs", short: "PROJ", level: 2 },
  { key: "foundations", label: "Foundations / coursework", short: "BASE", level: 1 },
] as const;

const slug = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Three honest tiers, drawn as a 3-segment meter. No percentages. */
function Meter({ level }: { level: number }) {
  return (
    <span className="meter" data-level={level} aria-hidden>
      <i /> <i /> <i />
    </span>
  );
}

export function SkillMatrix() {
  const all = skillGroups.flatMap((g) => [...g.production, ...g.projects, ...g.foundations]);
  const prod = skillGroups.reduce((n, g) => n + g.production.length, 0);
  const stats = [
    { n: all.length, label: "technologies & practices" },
    { n: prod, label: "used in production" },
    { n: skillGroups.length, label: "domains" },
    { n: "0", label: "made-up percentages" },
  ];
  return (
    <>
      <div className="sm-head reveal">
        <dl className="sm-stats">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="mono">{s.label}</dt>
              <dd>{s.n}</dd>
            </div>
          ))}
        </dl>
        <ul className="sm-legend mono" aria-label="Legend">
          {tiers.map((t) => (
            <li key={t.key}>
              <Meter level={t.level} /> {t.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="sm-grid">
        {skillGroups.map((g) => {
          const items = tiers.flatMap((t) => g[t.key].map((name) => ({ name, t })));
          return (
            <section className="sm-card reveal spot" key={g.title} aria-labelledby={`sm-${slug(g.title)}`}>
              <header className="sm-bar">
                <span className="dd-dots" aria-hidden><i /> <i /> <i /></span>
                <span className="mono sm-path">~/toolkit/<b>{g.title.split(/[ &]/)[0].toLowerCase()}</b></span>
                <span className="mono sm-count" aria-hidden>
                  {g.production.length}·{g.projects.length}·{g.foundations.length}
                </span>
              </header>
              <h3 id={`sm-${slug(g.title)}`} className="sm-title">{g.title}</h3>
              <ul className="sm-list">
                {items.map(({ name, t }) => (
                  <li key={name} data-tier={t.key}>
                    <span className="sm-name">{name}</span>
                    <Meter level={t.level} />
                    <span className="sm-tier mono">
                      {t.short}
                      <span className="visually-hidden"> ({t.label})</span>
                    </span>
                  </li>
                ))}
              </ul>
              <footer className="sm-foot">
                <span className="mono">seen in</span>
                {g.evidence.map((s) => (
                  <Link key={s} to={`/work/${s}/`}>{getProject(s)?.title}</Link>
                ))}
              </footer>
            </section>
          );
        })}
      </div>
    </>
  );
}
