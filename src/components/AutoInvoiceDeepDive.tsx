import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "../hooks";

/* ------------------------------------------------------------------------------------------------
 * Auto-Invoice engineering patterns. Everything here runs on synthetic data with fictional names.
 * The engine below is a compact re-implementation written for this page, not the production source.
 * ---------------------------------------------------------------------------------------------- */

/* ===== P1 · Incremental, idempotent ingest ===================================================== */

const ingestSteps: [string, string, string][] = [
  ["List", "Drive folder", "files where modifiedTime > cursor"],
  ["Fetch", "stream → Buffer", "any response shape normalized"],
  ["Parse", "SheetJS", "sheet_to_json · date from filename"],
  ["Normalize", "typed rows", "numbers · dates · source_file"],
  ["Upsert", "chunks of 1,000", "onConflict (user, date, campaign, file)"],
  ["Commit", "advance cursor", "only if files > 0"],
];

function IngestLane() {
  return (
    <div className="ai-ingest">
      <ol className="ai-lane">
        {ingestSteps.map(([t, m, d], i) => (
          <li key={t} style={{ ["--i" as string]: i }}>
            <span className="mono ai-step">{String(i + 1).padStart(2, "0")}</span>
            <strong>{t}</strong>
            <span className="mono ai-meta">{m}</span>
            <span className="ai-desc">{d}</span>
          </li>
        ))}
      </ol>
      <div className="ai-ingest-notes">
        <div>
          <span className="mono">mode=incremental</span>
          <p>Reads only new or re-exported files since the last successful import.</p>
        </div>
        <div>
          <span className="mono">mode=full</span>
          <p>Ignores the cursor and re-reads everything. Upserts make it safe.</p>
        </div>
        <div className="ai-gold">
          <span className="mono">empty run</span>
          <p>Cursor is left untouched, so a run that saw nothing can never skip a file later.</p>
        </div>
      </div>
    </div>
  );
}

/* ===== P2 · Rules engine playground =============================================================== */

type Row = { date: string; campaign: string; events: number; billable: number; minutes: number };

// Synthetic usage rows. Campaign codes and values are invented.
const rows: Row[] = [
  { date: "05-01", campaign: "ALPHA", events: 140, billable: 92, minutes: 26 },
  { date: "05-01", campaign: "BRAVO", events: 88, billable: 51, minutes: 14 },
  { date: "05-02", campaign: "ALPHA", events: 131, billable: 87, minutes: 31 },
  { date: "05-02", campaign: "BRAVO", events: 64, billable: 22, minutes: 6 },
  { date: "05-03", campaign: "ALPHA", events: 152, billable: 99, minutes: 22 },
  { date: "05-03", campaign: "CHARLIE", events: 17, billable: 9, minutes: 3 },
  { date: "05-04", campaign: "BRAVO", events: 93, billable: 60, minutes: 18 },
  { date: "05-04", campaign: "CHARLIE", events: 21, billable: 12, minutes: 9 },
];

type Rules = {
  filters: { field: keyof Row; op: ">="; value: number }[];
  group_by: (keyof Row)[];
  metrics: { name: string; op: "SUM_COLUMN"; column: keyof Row }[];
  pricing: { description: string; quantity: string; unit_price: number; min_total?: number }[];
  adjustments: { type: "round"; to: number }[];
};

/** Five-stage evaluation: filter → group → metrics → pricing → adjustments. */
function evaluate(rules: Rules, input: Row[]) {
  const filtered = input.filter((r) => rules.filters.every((f) => Number(r[f.field]) >= f.value));
  const groups = new Map<string, Row[]>();
  for (const r of filtered) {
    const k = rules.group_by.length ? rules.group_by.map((g) => String(r[g])).join("|") : "all";
    groups.set(k, [...(groups.get(k) ?? []), r]);
  }
  const lines = [...groups.entries()].flatMap(([key, rs]) => {
    const scope: Record<string, number | string> = { campaign: key === "all" ? "all campaigns" : key };
    for (const m of rules.metrics) scope[m.name] = rs.reduce((a, r) => a + Number(r[m.column]), 0);
    return rules.pricing.map((p) => {
      const render = (t: string) => t.replace(/{{\s*([^}]+)\s*}}/g, (_s, k: string) => String(scope[k.trim()] ?? ""));
      const qty = Number(render(p.quantity)) || 0;
      let amount = qty * p.unit_price;
      const floored = p.min_total !== undefined && amount < p.min_total;
      if (floored) amount = p.min_total!;
      for (const a of rules.adjustments) amount = Number(amount.toFixed(a.to));
      return { description: render(p.description), qty, rate: p.unit_price, amount, floored };
    });
  });
  return { filtered: filtered.length, groups: groups.size, lines, total: lines.reduce((a, l) => a + l.amount, 0) };
}

function RulesPlayground() {
  const [minMinutes, setMinMinutes] = useState(10);
  const [grouped, setGrouped] = useState(true);
  const [floor, setFloor] = useState(true);

  const rules: Rules = useMemo(
    () => ({
      filters: minMinutes > 0 ? [{ field: "minutes", op: ">=", value: minMinutes }] : [],
      group_by: grouped ? ["campaign"] : [],
      metrics: [{ name: "billable_events", op: "SUM_COLUMN", column: "billable" }],
      pricing: [{ description: "Billable events · {{campaign}}", quantity: "{{billable_events}}", unit_price: 0.5, ...(floor ? { min_total: 40 } : {}) }],
      adjustments: [{ type: "round", to: 2 }],
    }),
    [minMinutes, grouped, floor],
  );
  const out = useMemo(() => evaluate(rules, rows), [rules]);
  const json = JSON.stringify(rules, null, 2);

  return (
    <div className="ai-play">
      <div className="ai-controls" role="group" aria-label="Rule controls">
        <label className="ai-range">
          <span className="mono">filters · minutes ≥ <b>{minMinutes}</b></span>
          <input type="range" min={0} max={30} step={1} value={minMinutes} onChange={(e) => setMinMinutes(Number(e.target.value))} aria-label="Minimum minutes filter" />
        </label>
        <button type="button" role="switch" aria-checked={grouped} className="sw" data-on={grouped} onClick={() => setGrouped(!grouped)}>
          <span className="sw-track" aria-hidden><span className="sw-thumb" /></span>
          <span className="sw-text"><span className="mono">group_by: ["campaign"]</span><span className="sw-hint">One line per campaign, or one combined line.</span></span>
        </button>
        <button type="button" role="switch" aria-checked={floor} className="sw" data-on={floor} onClick={() => setFloor(!floor)}>
          <span className="sw-track" aria-hidden><span className="sw-thumb" /></span>
          <span className="sw-text"><span className="mono">min_total: 40</span><span className="sw-hint">A floor per line: amount = max(qty × rate, floor).</span></span>
        </button>
      </div>

      <div className="ai-play-grid">
        <figure className="dd-code ai-json">
          <div className="dd-code-bar">
            <span className="dd-dots" aria-hidden><i /> <i /> <i /></span>
            <span className="mono">template.rules.json</span>
            <span className="mono dd-code-tag">live</span>
          </div>
          <pre tabIndex={0} aria-label="Current rules as JSON"><code>{json}</code></pre>
        </figure>

        <div className="ai-result" aria-live="polite">
          <div className="ai-pipeline mono">
            <span><b>{rows.length}</b> rows in</span>
            <span aria-hidden>→</span>
            <span><b>{out.filtered}</b> after filters</span>
            <span aria-hidden>→</span>
            <span><b>{out.groups}</b> group{out.groups === 1 ? "" : "s"}</span>
          </div>
          <table className="ai-table">
            <thead>
              <tr><th>Line</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>
            </thead>
            <tbody>
              {out.lines.map((l) => (
                <tr key={l.description}>
                  <td>{l.description}</td>
                  <td>{l.qty}</td>
                  <td>{l.rate.toFixed(2)}</td>
                  <td>
                    {l.amount.toFixed(2)}
                    {l.floored && <span className="ai-floor mono"> floor</span>}
                  </td>
                </tr>
              ))}
              {out.lines.length === 0 && (
                <tr><td colSpan={4} className="muted">No rows pass the filters.</td></tr>
              )}
            </tbody>
            <tfoot>
              <tr><td colSpan={3}>Total</td><td className="ai-total">{out.total.toFixed(2)}</td></tr>
            </tfoot>
          </table>
          <p className="ai-note">Synthetic rows, invented campaigns and a made-up rate. Same function powers preview and the final invoice.</p>
        </div>
      </div>
    </div>
  );
}

/* ===== P3 · Mapping cascade ======================================================================== */

type MapRule = { type: "exact" | "prefix" | "regex"; pattern: string; client: string };
const mapRules: MapRule[] = [
  { type: "exact", pattern: "ALPHA-MAIN", client: "Client A" },
  { type: "prefix", pattern: "BRV-", client: "Client B" },
  { type: "regex", pattern: "^ZX\\d{3}$", client: "Client C" },
];

function match(code: string) {
  const trace: { rule: MapRule; hit: boolean }[] = [];
  let winner: MapRule | null = null;
  for (const type of ["exact", "prefix", "regex"] as const) {
    for (const r of mapRules.filter((m) => m.type === type)) {
      let hit = false;
      if (!winner) {
        if (type === "exact") hit = code === r.pattern;
        else if (type === "prefix") hit = code.startsWith(r.pattern);
        else {
          try {
            hit = new RegExp(r.pattern).test(code);
          } catch {
            hit = false;
          }
        }
      }
      trace.push({ rule: r, hit });
      if (hit) winner = r;
    }
  }
  return { trace, winner };
}

function MappingCascade() {
  const [code, setCode] = useState("BRV-SPRING");
  const { trace, winner } = match(code.trim());
  return (
    <div className="ai-map">
      <div className="ai-map-input">
        <label className="mono" htmlFor="ai-map-code">campaign code</label>
        <input id="ai-map-code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} spellCheck={false} autoComplete="off" />
        <div className="chips">
          {["ALPHA-MAIN", "BRV-SPRING", "ZX204", "ZX20", "OMEGA-9"].map((c) => (
            <button type="button" key={c} className="chip ai-pick" onClick={() => setCode(c)}>{c}</button>
          ))}
        </div>
      </div>
      <ol className="ai-map-trace" aria-live="polite">
        {trace.map(({ rule, hit }, i) => (
          <li key={rule.pattern} data-hit={hit} data-skipped={!hit && !!winner && trace.findIndex((t) => t.hit) < i}>
            <span className="mono ai-type">{rule.type}</span>
            <code>{rule.pattern}</code>
            <span className="ai-arrow" aria-hidden>→</span>
            <span>{rule.client}</span>
            <span className="mono ai-verdict">{hit ? "MATCH" : winner && trace.findIndex((t) => t.hit) < i ? "skipped" : "no"}</span>
          </li>
        ))}
        <li data-hit={!winner} className="ai-unmapped">
          <span className="mono ai-type">fallback</span>
          <code>*</code>
          <span className="ai-arrow" aria-hidden>→</span>
          <span>Unmapped bucket</span>
          <span className="mono ai-verdict">{winner ? "—" : "REVIEW"}</span>
        </li>
      </ol>
      <p className="ai-note">Most specific rule wins. Anything that matches nothing is never billed silently: it lands in an Unmapped bucket for a person to review.</p>
    </div>
  );
}

/* ===== P4 · Invoice creation saga ================================================================== */

type Scenario = "ok" | "dup" | "lines" | "ledger";
const steps = [
  { id: "preview", label: "Preview", sub: "dry-run the rules" },
  { id: "guard", label: "Guard", sub: "no invoice for client + period" },
  { id: "invoice", label: "Insert invoice", sub: "header row" },
  { id: "lines", label: "Insert lines", sub: "one per priced line" },
  { id: "ledger", label: "Ledger entry", sub: "effective date" },
  { id: "pdf", label: "Render PDF", sub: "pdf-lib" },
  { id: "store", label: "Store version", sub: "storage + document row" },
] as const;
type StepState = "idle" | "run" | "ok" | "fail" | "undo" | "skip";

function plan(s: Scenario): StepState[][] {
  const n = steps.length;
  const frames: StepState[][] = [];
  const cur: StepState[] = Array(n).fill("idle");
  const push = () => frames.push([...cur]);
  const failAt = s === "dup" ? 1 : s === "lines" ? 3 : s === "ledger" ? 4 : -1;
  for (let i = 0; i < n; i++) {
    cur[i] = "run";
    push();
    if (i === failAt) {
      cur[i] = "fail";
      for (let j = i + 1; j < n; j++) cur[j] = "skip";
      push();
      for (let j = i - 1; j >= 2; j--) {
        cur[j] = "undo";
        push();
      }
      return frames;
    }
    cur[i] = "ok";
    push();
  }
  return frames;
}

const outcomes: Record<Scenario, string> = {
  ok: "OK · invoice, lines, ledger entry and PDF v1 written.",
  dup: "409 Conflict · an invoice already exists for this client and period. Nothing was written.",
  lines: "400 · line insert failed. Compensation deleted the invoice header. Database is back to its previous state.",
  ledger: "400 · ledger insert failed. Compensation deleted the lines, then the invoice. Nothing partial remains.",
};

function InvoiceSaga() {
  const reduced = useReducedMotion();
  const [scenario, setScenario] = useState<Scenario>("lines");
  const [frame, setFrame] = useState<StepState[]>(Array(steps.length).fill("idle"));
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const run = (s: Scenario) => {
    clear();
    setScenario(s);
    setDone(false);
    const frames = plan(s);
    if (reduced) {
      setFrame(frames[frames.length - 1]);
      setDone(true);
      return;
    }
    frames.forEach((f, i) => {
      timers.current.push(window.setTimeout(() => {
        setFrame(f);
        if (i === frames.length - 1) setDone(true);
      }, i * 260));
    });
  };

  const options: [Scenario, string][] = [
    ["ok", "Happy path"],
    ["dup", "Duplicate period"],
    ["lines", "Lines insert fails"],
    ["ledger", "Ledger insert fails"],
  ];
  const label: Record<StepState, string> = { idle: "", run: "running", ok: "ok", fail: "failed", undo: "rolled back", skip: "skipped" };

  return (
    <div className="ai-saga">
      <div className="ai-saga-opts" role="group" aria-label="Choose a scenario to simulate">
        {options.map(([k, l]) => (
          <button key={k} type="button" className="btn" aria-pressed={scenario === k && done} onClick={() => run(k)}>
            {l}
          </button>
        ))}
      </div>
      <ol className="ai-saga-steps">
        {steps.map((st, i) => (
          <li key={st.id} data-state={frame[i]}>
            <span className="ai-saga-dot" aria-hidden />
            <span className="mono ai-step">{String(i + 1).padStart(2, "0")}</span>
            <strong>{st.label}</strong>
            <span className="ai-desc">{st.sub}</span>
            <span className="mono ai-saga-state">{label[frame[i]]}</span>
          </li>
        ))}
      </ol>
      <p className="ai-saga-out mono" role="status">{done ? outcomes[scenario] : "Pick a scenario to run the create flow."}</p>
    </div>
  );
}

/* ===== P5 · Access in depth ======================================================================== */

const layers: [string, string, string][] = [
  ["Edge", "Next.js proxy", "Refreshes the Supabase session cookies on every page request, so server and browser agree on who is signed in."],
  ["Pages", "RoleRouteGuard", "Operator and client areas render only for their role. Signed-out visitors go to sign-in with a return path; inactive profiles are turned away."],
  ["API", "Handler checks", "Route handlers re-check the caller's session or bearer token, and their role where it matters, returning 401 or 403 before touching data."],
  ["Secrets", "Server-only keys", "The service-role key exists only inside route handlers. Browser bundles carry the public anon key only."],
];

function AccessStack() {
  return (
    <ol className="ai-access">
      {layers.map(([k, t, d], i) => (
        <li key={k} style={{ ["--d" as string]: i }}>
          <span className="mono ai-access-k">{k}</span>
          <strong>{t}</strong>
          <span>{d}</span>
        </li>
      ))}
    </ol>
  );
}

export function AutoInvoiceDeepDive() {
  return (
    <div className="dd">
      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">P1 · Ingest</span>
          <h3>Spreadsheets in, clean rows out, safe to repeat</h3>
          <p>Daily usage workbooks come from a connected Google Drive folder. Every stage is idempotent, and the cursor only moves when a run succeeds with data.</p>
        </div>
        <IngestLane />
      </div>

      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">P2 · Rules engine</span>
          <h3>Pricing as data: try it</h3>
          <p>Each client's billing is a typed JSON template. Change the rules and watch the engine re-price eight synthetic rows live.</p>
        </div>
        <RulesPlayground />
      </div>

      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">P3 · Mapping</span>
          <h3>Which client does this usage belong to?</h3>
          <p>Campaign codes resolve through a precedence cascade. Type a code or pick one.</p>
        </div>
        <MappingCascade />
      </div>

      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">P4 · Create flow</span>
          <h3>An invoice is all or nothing</h3>
          <p>Without one wrapping transaction, the create route runs as a saga: every write has a compensating delete. Break it on purpose.</p>
        </div>
        <InvoiceSaga />
      </div>

      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">P5 · Access</span>
          <h3>Defense in depth for two audiences</h3>
        </div>
        <AccessStack />
      </div>
    </div>
  );
}
