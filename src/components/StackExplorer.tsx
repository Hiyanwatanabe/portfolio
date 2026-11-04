import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { layers } from "../data/skills";
import { ArrowRight } from "./Icons";

/**
 * "Interface to infrastructure": the five layers of a typical application as stations on one lane.
 * WAI-ARIA tabs: arrow keys / Home / End move between layers; hover or tap selects.
 * A general picture of the stack, not a diagram of any employer system.
 */
export function StackExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const layer = layers[active];
  const evidence = projects.filter((p) => p.layers.includes(layer.id));

  const focusTab = (i: number) => {
    const n = (i + layers.length) % layers.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: layers.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      focusTab(map[e.key]);
    }
  };

  return (
    <div className="explorer" style={{ ["--p" as string]: active / (layers.length - 1) }}>
      <div className="explorer-rail" role="tablist" aria-label="Layers of an application" aria-orientation="horizontal" onKeyDown={onKey}>
        <span className="explorer-track" aria-hidden>
          <span className="explorer-fill" />
        </span>
        {layers.map((l, i) => (
          <button
            key={l.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`${id}-tab-${l.id}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            className="explorer-tab"
            data-done={i < active}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
          >
            <span className="explorer-dot" aria-hidden />
            <span className="mono explorer-num">L{i + 1}</span>
            <span className="explorer-name">{l.name}</span>
            <span className="explorer-short">{l.short}</span>
          </button>
        ))}
      </div>

      <div className="explorer-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${layer.id}`} key={layer.id}>
        <div>
          <p className="mono explorer-label">What I do here</p>
          <p className="explorer-body">{layer.body}</p>
        </div>
        <div>
          <p className="mono explorer-label">Tools</p>
          <ul className="chips">
            {layer.tools.map((t) => (
              <li className="chip" key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mono explorer-label">Where you can see it</p>
          <ul className="explorer-links">
            {evidence.map((p) => (
              <li key={p.slug}>
                <Link to={`/work/${p.slug}/`} className="link-arrow">
                  {p.title} <ArrowRight />
                </Link>
                <span className="muted">{p.context}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
