import { useState } from "react";
import { useReducedMotion } from "../hooks";

/* ------------------------------------------------------------------------------------------------
 * TF4 engineering patterns: four illustrations of how the platform is built.
 * They show engineering patterns, not production code, data or business rules.
 * ---------------------------------------------------------------------------------------------- */

/** Animated state machine for a background job: queued → running → backoff → resume → done. */
function JobLifecycle() {
  const reduced = useReducedMotion();
  const S = {
    queued: { x: 90, y: 150 },
    running: { x: 300, y: 150 },
    backoff: { x: 300, y: 330 },
    checkpoint: { x: 520, y: 330 },
    done: { x: 740, y: 150 },
    failed: { x: 740, y: 330 },
  };
  const state = (k: keyof typeof S, label: string, sub: string, tone: "accent" | "gold" | "muted" | "plain" = "plain") => {
    const { x, y } = S[k];
    const stroke = tone === "accent" ? "#6fd6c9" : tone === "gold" ? "#e2b653" : tone === "muted" ? "rgb(148 170 195 / .35)" : "rgb(148 170 195 / .5)";
    const fill = tone === "accent" ? "rgb(111 214 201 / .08)" : tone === "gold" ? "rgb(226 182 83 / .07)" : "var(--surface)";
    return (
      <g key={k}>
        <rect x={x - 78} y={y - 30} width={156} height={60} rx={30} fill={fill} stroke={stroke} strokeWidth={1.4} />
        <text x={x} y={y - 3} textAnchor="middle" className="title" fontSize={14} style={{ letterSpacing: ".06em" }}>
          {label}
        </text>
        <text x={x} y={y + 15} textAnchor="middle" className="muted-t" fontSize={10.5}>
          {sub}
        </text>
      </g>
    );
  };
  const happy = `M ${S.queued.x + 78} 150 H ${S.running.x - 78} M ${S.running.x + 78} 150 H ${S.done.x - 78}`;
  const token = "M 168 150 H 222 M 300 180 V 300 H 300 M 378 330 H 442 M 520 300 C 520 220, 420 180, 378 160 H 662";
  return (
    <figure className="dd-figure">
      <div className="dd-scroll" tabIndex={0} role="region" aria-label="Job lifecycle diagram">
      <svg className="dg" viewBox="0 95 860 300" role="img" aria-label="Job lifecycle: a queued job runs; on a rate limit it backs off, keeps its saved cursor and resumes from the checkpoint; it ends completed, or failed after retries are exhausted.">
        <defs>
          <marker id="ddArrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0.5 L7 4 L0 7.5" fill="none" stroke="#6fd6c9" strokeWidth="1.2" />
          </marker>
          <marker id="ddArrowG" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0.5 L7 4 L0 7.5" fill="none" stroke="#e2b653" strokeWidth="1.2" />
          </marker>
        </defs>
        {[90, 210, 270, 390].map((y) => (
          <line key={y} x1={20} x2={840} y1={y} y2={y} stroke="rgb(148 170 195 / .1)" strokeDasharray="3 9" />
        ))}
        <path d={happy} stroke="#6fd6c9" strokeWidth={1.6} fill="none" markerEnd="url(#ddArrow)" />
        <path d="M 168 150 H 220" stroke="#6fd6c9" strokeWidth={1.6} fill="none" markerEnd="url(#ddArrow)" />
        <path d="M 300 182 V 298" stroke="#e2b653" strokeWidth={1.4} fill="none" strokeDasharray="5 4" markerEnd="url(#ddArrowG)" />
        <path d="M 380 330 H 440" stroke="#e2b653" strokeWidth={1.4} fill="none" strokeDasharray="5 4" markerEnd="url(#ddArrowG)" />
        <path d="M 520 298 C 520 220, 430 185, 380 168" stroke="#6fd6c9" strokeWidth={1.4} fill="none" strokeDasharray="5 4" markerEnd="url(#ddArrow)" />
        <path d="M 378 165 C 560 200, 700 250, 740 298" stroke="rgb(148 170 195 / .4)" strokeWidth={1.2} fill="none" strokeDasharray="2 5" markerEnd="url(#ddArrow)" />

        <text x={312} y={245} fontSize={10.5} style={{ fill: "var(--gold)" }}>rate limit / timeout</text>
        <text x={392} y={318} fontSize={10.5} style={{ fill: "var(--gold)" }}>cooldown</text>
        <text x={470} y={215} fontSize={10.5} style={{ fill: "var(--accent)" }}>resume @ cursor</text>
        <text x={600} y={236} fontSize={10.5} className="muted-t">retries exhausted</text>
        <text x={520} y={138} fontSize={10.5} className="muted-t" textAnchor="middle">batch ok → commit cursor</text>

        {state("queued", "QUEUED", "run record created")}
        {state("running", "RUNNING", "batch n of m", "accent")}
        {state("backoff", "BACKOFF", "wait, then retry", "gold")}
        {state("checkpoint", "CHECKPOINT", "cursor persisted")}
        {state("done", "COMPLETED", "summary + exports", "accent")}
        {state("failed", "FAILED", "error kept on record", "muted")}

        {!reduced && (
          <circle r={6} fill="#9ae8de">
            <animateMotion dur="7s" repeatCount="indefinite" path={token} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
          </circle>
        )}
      </svg>
      </div>
      <figcaption>
        <span>Every long-running job is a state machine with a durable cursor: a failure resumes the batch, it never repeats one.</span>
      </figcaption>
    </figure>
  );
}

/** Interactive two-key safety switch. Both keys must be on before anything is changed at the provider. */
function SafetySwitch() {
  const [config, setConfig] = useState(false);
  const [caller, setCaller] = useState(false);
  const armed = config && caller;
  const Switch = ({ on, set, label, hint }: { on: boolean; set: (v: boolean) => void; label: string; hint: string }) => (
    <button type="button" role="switch" aria-checked={on} className="sw" data-on={on} onClick={() => set(!on)}>
      <span className="sw-track" aria-hidden>
        <span className="sw-thumb" />
      </span>
      <span className="sw-text">
        <span className="mono">{label}</span>
        <span className="sw-hint">{hint}</span>
      </span>
    </button>
  );
  return (
    <div className="dd-switch">
      <div className="dd-switch-inputs">
        <Switch on={config} set={setConfig} label="config.auto_reserve" hint="Stored setting. Off by default." />
        <Switch on={caller} set={setCaller} label="execute=True" hint="Explicit flag from the calling code." />
      </div>
      <svg className="dd-gate" viewBox="0 0 220 160" aria-hidden>
        <path d="M 0 45 H 70" stroke={config ? "#6fd6c9" : "rgb(148 170 195 / .3)"} strokeWidth={2} />
        <path d="M 0 115 H 70" stroke={caller ? "#6fd6c9" : "rgb(148 170 195 / .3)"} strokeWidth={2} />
        <path d="M 70 20 H 115 A 60 60 0 0 1 115 140 H 70 Z" fill={armed ? "rgb(111 214 201 / .1)" : "var(--surface)"} stroke={armed ? "#6fd6c9" : "rgb(148 170 195 / .45)"} strokeWidth={1.6} />
        <text x={112} y={86} textAnchor="middle" className="title" fontSize={16}>AND</text>
        <path d="M 175 80 H 220" stroke={armed ? "#6fd6c9" : "rgb(148 170 195 / .3)"} strokeWidth={2} />
      </svg>
      <div className="dd-lamp" data-armed={armed} role="status" aria-live="polite">
        <span className="dd-lamp-dot" aria-hidden />
        <span className="mono">{armed ? "ARMED" : "BLOCKED"}</span>
        <span className="dd-lamp-text">{armed ? "Reservation path may run, and every action is logged." : "Scans only. Nothing changes at the provider."}</span>
      </div>
    </div>
  );
}

/** Tiny Python highlighter: keywords, strings, comments, decorators, numbers, function names. */
function highlight(code: string) {
  const re = /(#.*$)|("(?:[^"\\]|\\.)*")|\b(def|for|in|try|except|as|if|and|return|not|raise|with|None|True|False)\b|\b(\d+)\b|(\b[a-z_]+)(?=\()/gm;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const cls = m[1] ? "tk-c" : m[2] ? "tk-s" : m[3] ? "tk-k" : m[4] ? "tk-n" : "tk-f";
    out.push(<span key={i++} className={cls}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  out.push(code.slice(last));
  return out;
}

const snippet = `def run_scan(job: Job, *, execute: bool = False) -> Run:
    run = Run.start(job)                       # every run leaves a record
    for batch in job.batches(start=job.cursor):  # resume where we stopped
        try:
            result = client.check(batch)       # session, retry, poll, redact
        except RateLimited as err:
            return run.pause(backoff=err.retry_after)
        run.record(classify(result))
        job.cursor = batch.end
        db.commit()                            # checkpoint after each batch
        if execute and settings.auto_reserve:  # two keys, both required
            reserve(result.eligible, run=run)
    return run.finish()`;

function CodePanel() {
  return (
    <figure className="dd-code">
      <div className="dd-code-bar">
        <span className="dd-dots" aria-hidden>
          <i /> <i /> <i />
        </span>
        <span className="mono">scan_pattern.py</span>
        <span className="mono dd-code-tag">illustrative · simplified</span>
      </div>
      <pre tabIndex={0} aria-label="Illustrative Python showing the resumable, two-key scan pattern">
        <code>
          {snippet.split("\n").map((line, n) => (
            <span className="ln" key={n}>
              <span className="ln-n" aria-hidden>{String(n + 1).padStart(2, " ")}</span>
              {highlight(line)}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
      <figcaption>The pattern, written for this page. It is not the production source.</figcaption>
    </figure>
  );
}

const release = [
  ["Fingerprint", "hash every live file"],
  ["Diff", "compare against the package"],
  ["Back up", "copy what will change"],
  ["Ship", "copy selected files only"],
  ["Restart", "at a quiet time"],
  ["Verify", "service check + undo steps"],
];

function ReleaseLane() {
  return (
    <div className="dd-release">
      <ol>
        {release.map(([t, d], i) => (
          <li key={t}>
            <span className="mono dd-step">{String(i + 1).padStart(2, "0")}</span>
            <strong>{t}</strong>
            <span>{d}</span>
          </li>
        ))}
      </ol>
      <p className="muted">No whole-tree copies, no surprise schema changes: every release is reversible by design.</p>
    </div>
  );
}

export function Tf4DeepDive() {
  return (
    <div className="dd">
      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">P1 · Resumable jobs</span>
          <h3>Long jobs that survive failure</h3>
          <p>Scans and checks run for a long time against an API that rate-limits. Each job is a small state machine with a run record and a cursor committed after every batch.</p>
        </div>
        <JobLifecycle />
      </div>

      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">P2 · Two-key safety</span>
          <h3>Nothing irreversible by accident</h3>
          <p>The action that costs money needs two independent keys. Try it: flip one switch, then both.</p>
        </div>
        <SafetySwitch />
      </div>

      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">P3 · The loop</span>
          <h3>The whole idea in a dozen lines</h3>
          <p>Record, resume, back off, checkpoint, and only then, behind both keys, act.</p>
        </div>
        <CodePanel />
      </div>

      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">P4 · Releases</span>
          <h3>Production changes, one verified file at a time</h3>
        </div>
        <ReleaseLane />
      </div>
    </div>
  );
}
