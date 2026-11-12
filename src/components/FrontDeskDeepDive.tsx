import { useMemo, useState, type ReactNode } from "react";
import callback from "../assets/img/fd-callback-540.webp";
import outcome from "../assets/img/fd-outcome-540.webp";
import texts from "../assets/img/fd-texts-540.webp";

/* ------------------------------------------------------------------------------------------------
 * Online front desk: the business case, the product, and the engine that sells it.
 * Calculators and lead data here are illustrative and synthetic; no shop, lead or customer data.
 * ---------------------------------------------------------------------------------------------- */

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/* ===== B1 · The economics of a missed call ======================================================= */

function MissedCallMath() {
  const [calls, setCalls] = useState(8);
  const [share, setShare] = useState(30);
  const [ticket, setTicket] = useState(300);
  const weekly = (calls * share) / 100;
  const monthly = (weekly * 52) / 12;
  const atRisk = monthly * ticket;
  return (
    <div className="ai-play fd-calc">
      <div className="ai-controls" role="group" aria-label="Shop assumptions">
        <label className="ai-range">
          <span className="mono">missed calls / week · <b>{calls}</b></span>
          <input type="range" min={0} max={40} step={1} value={calls} onChange={(e) => setCalls(Number(e.target.value))} aria-label="Missed calls per week" />
        </label>
        <label className="ai-range">
          <span className="mono">would have booked · <b>{share}%</b></span>
          <input type="range" min={5} max={80} step={5} value={share} onChange={(e) => setShare(Number(e.target.value))} aria-label="Share of missed callers who would have booked" />
        </label>
        <label className="ai-range">
          <span className="mono">average job · <b>{money(ticket)}</b></span>
          <input type="range" min={100} max={1000} step={20} value={ticket} onChange={(e) => setTicket(Number(e.target.value))} aria-label="Average job value in dollars" />
        </label>
      </div>
      <div className="fd-kpis" aria-live="polite">
        <div>
          <span className="mono">Jobs lost / month</span>
          <strong>{monthly.toFixed(1)}</strong>
        </div>
        <div>
          <span className="mono">Revenue at risk / month</span>
          <strong className="fd-gold">{money(atRisk)}</strong>
        </div>
        <div>
          <span className="mono">Per year</span>
          <strong>{money(atRisk * 12)}</strong>
        </div>
        <div>
          <span className="mono">Recover just 1 job / month</span>
          <strong className="fd-accent">+{money(ticket * 12)}/yr</strong>
        </div>
      </div>
      <p className="ai-note">
        An illustrative model with your own inputs, not measured data. The $300 starting point is the brake-job example from
        the explainer. The pitch only works if this number is obvious to the owner in ten seconds, so the product is built
        to move it.
      </p>
    </div>
  );
}

/* ===== B2 · The product, as the owner sees it ===================================================== */

const frames = [
  { src: callback, alt: "Call-back list on a phone: four waiting customers, oldest first, each with car, problem, wait time and a Call button; the first is marked Booked", caption: "One call-back list, oldest first" },
  { src: outcome, alt: "After a call, a sheet asks How did it go? with Booked and Left voicemail buttons", caption: "Tap the result: booked or follow-up" },
  { src: texts, alt: "Automatic text messages to a customer: request received, car ready for pickup, and a review request the next day", caption: "Automatic texts and a review request" },
];

function ProductFrames() {
  return (
    <div className="fd-product">
      <div className="fd-phones">
        {frames.map((f) => (
          <figure key={f.caption}>
            <img src={f.src} width={540} height={960} alt={f.alt} loading="lazy" decoding="async" />
            <figcaption className="mono">{f.caption}</figcaption>
          </figure>
        ))}
      </div>
      <figure className="fd-video">
        <video
          controls
          playsInline
          preload="none"
          poster={callback}
          width={720}
          height={1280}
          src={`${import.meta.env.BASE_URL}media/front-desk-explainer.mp4`}
          aria-label="75-second explainer video for the online front desk, with burned-in captions"
        />
        <figcaption>
          <span className="mono">The 75-second explainer</span>
          <span>React + Remotion, rendered to 1080×1920 at 30 fps, AI voiceover, captions burned in so it works muted. Example names and numbers.</span>
        </figcaption>
      </figure>
    </div>
  );
}

/* ===== B3 · Lead engine: qualify before you pitch ================================================= */

// 48 synthetic shops with a deterministic mix of traits.
const leads = Array.from({ length: 48 }, (_, i) => ({
  chain: i % 5 === 0,
  website: i % 4 !== 3,
  email: i % 4 !== 3 && i % 3 !== 2,
  software: i % 4 !== 3 && i % 3 !== 2 && i % 7 === 1,
}));

function LeadFunnel() {
  const [noChains, setNoChains] = useState(true);
  const [needEmail, setNeedEmail] = useState(true);
  const [skipSoftware, setSkipSoftware] = useState(true);
  const [cap, setCap] = useState(25);

  const steps = useMemo(() => {
    const a = leads;
    const b = noChains ? a.filter((l) => !l.chain) : a;
    const c = needEmail ? b.filter((l) => l.email) : b;
    const d = skipSoftware ? c.filter((l) => !l.software) : c;
    return [
      { label: "Found on the map", n: a.length, note: "shop=car_repair within the radius" },
      { label: "Independent", n: b.length, note: noChains ? "chains, franchises and dealers removed" : "filter off: chains included" },
      { label: "Reachable", n: c.length, note: needEmail ? "public email found on their site" : "filter off: no email needed" },
      { label: "Good fit", n: d.length, note: skipSoftware ? "no shop software or online booking already" : "filter off: may already have a tool" },
    ];
  }, [noChains, needEmail, skipSoftware]);
  const fit = steps[3].n;
  const days = Math.max(1, Math.ceil(fit / cap));

  const sw = (on: boolean, set: (v: boolean) => void, code: string, hint: string) => (
    <button type="button" role="switch" aria-checked={on} className="sw" data-on={on} onClick={() => set(!on)}>
      <span className="sw-track" aria-hidden><span className="sw-thumb" /></span>
      <span className="sw-text"><span className="mono">{code}</span><span className="sw-hint">{hint}</span></span>
    </button>
  );

  return (
    <div className="ai-play">
      <div className="ai-controls fd-controls" role="group" aria-label="Lead filters">
        {sw(noChains, setNoChains, "exclude: chains & dealers", "Owners decide; branches can't buy.")}
        {sw(needEmail, setNeedEmail, "require: public email", "Crawl the site and contact pages.")}
        {sw(skipSoftware, setSkipSoftware, "skip: has shop software", "Tekmetric, Shopmonkey, booking forms…")}
        <label className="ai-range">
          <span className="mono">daily cap · <b>{cap}</b></span>
          <input type="range" min={10} max={50} step={5} value={cap} onChange={(e) => setCap(Number(e.target.value))} aria-label="Daily sending cap" />
        </label>
      </div>
      <ol className="fd-funnel" aria-live="polite">
        {steps.map((s) => (
          <li key={s.label}>
            <div className="fd-bar"><span style={{ width: `${(s.n / leads.length) * 100}%` }} /></div>
            <strong>{s.n}</strong>
            <span className="fd-step">{s.label}</span>
            <span className="muted">{s.note}</span>
          </li>
        ))}
      </ol>
      <div className="ai-pipeline mono">
        <span><b>{fit}</b> good-fit shops</span>
        <span aria-hidden>→</span>
        <span><b>{cap}</b> per day</span>
        <span aria-hidden>→</span>
        <span><b>{days}</b> sending day{days === 1 ? "" : "s"}</span>
      </div>
      <p className="ai-note">48 synthetic shops. Fewer, better emails beat more emails: every filter protects the sender's reputation and the owner's time.</p>
    </div>
  );
}

/* ===== B4 · Sending like a person ================================================================ */

// Small seeded PRNG so the server-rendered timeline matches the browser's first render.
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

function SendTimeline() {
  const [seed, setSeed] = useState(7);
  const cap = 25;
  const sends = useMemo(() => {
    const r = rng(seed);
    const out: number[] = [0];
    for (let i = 1; i < cap; i++) out.push(out[i - 1] + 1.5 + r() * 2.5);
    return out;
  }, [seed]);
  const total = sends[sends.length - 1];
  const W = 900;
  const x = (m: number) => 30 + (m / (total + 6)) * (W - 60);
  return (
    <figure className="cs-figure fd-timeline">
      <div className="figure-body" tabIndex={0} role="region" aria-label="Send timeline">
        <svg className="dg" viewBox={`0 0 ${W} 150`} role="img" aria-label={`${cap} emails spread over ${Math.round(total)} minutes with random gaps between 1.5 and 4 minutes, then the queue stops for the day`}>
          <line x1={30} x2={W - 30} y1={78} y2={78} className="wire" />
          {sends.map((m, i) => (
            <g key={i}>
              <line x1={x(m)} x2={x(m)} y1={60} y2={96} style={{ stroke: "var(--accent)", strokeOpacity: 0.55 }} />
              <circle cx={x(m)} cy={78} r={4} className="dot" />
            </g>
          ))}
          <line x1={x(total) + 18} x2={x(total) + 18} y1={44} y2={112} style={{ stroke: "var(--gold)" }} strokeWidth={2} />
          <text x={x(total) + 26} y={56} fontSize={11} style={{ fill: "var(--gold)" }}>daily cap</text>
          <text x={30} y={130} fontSize={11} className="muted-t">0 min</text>
          <text x={x(total)} y={130} fontSize={11} textAnchor="middle" className="muted-t">{Math.round(total)} min</text>
          <text x={30} y={30} fontSize={11} className="muted-t">EMAIL #1</text>
          <text x={x(total)} y={30} fontSize={11} textAnchor="end" className="muted-t">#{cap}, then stop until tomorrow</text>
        </svg>
      </div>
      <figcaption>
        <span>Random 1.5–4 minute gaps, a daily cap, one address never twice. It sends like a person, not a blast.</span>
        <button type="button" className="btn fd-shuffle" onClick={() => setSeed((s) => s + 1)}>Reshuffle gaps</button>
      </figcaption>
    </figure>
  );
}

const snippet = `// send-queue.mjs — illustrative, simplified
const gap = () => (90 + Math.random() * 150) * 1000;  // 1.5–4 min

async function tick() {
  if (!queue.length) return stop("Queue empty");
  if (sentToday() >= settings.dailyCap) return stop("Daily limit reached");
  const item = queue.shift();
  if (emailed.has(item.to) || doNotEmail.has(item.to)) return schedule(0);
  const mail = compose(item.lead, settings);        // {shop}, {city} filled in
  await gmail.send(mime(mail, explainerVideo));      // send-only OAuth scope
  log.unshift({ to: item.to, at: new Date(), status: "sent" });
  schedule(gap());
}`;

const KW = /\b(const|async|function|return|await|if|new)\b/g;
function highlight(line: string) {
  const c = line.indexOf("//");
  const code = c >= 0 ? line.slice(0, c) : line;
  const comment = c >= 0 ? line.slice(c) : "";
  const parts: ReactNode[] = [];
  let last = 0;
  const re = new RegExp(`${KW.source}|"[^"]*"|\\b\\d+(?:\\.\\d+)?\\b`, "g");
  for (const m of code.matchAll(re)) {
    parts.push(code.slice(last, m.index));
    const t = m[0];
    const cls = t.startsWith('"') ? "tk-s" : /^\d/.test(t) ? "tk-n" : "tk-k";
    parts.push(<span className={cls} key={m.index}>{t}</span>);
    last = m.index! + t.length;
  }
  parts.push(code.slice(last));
  if (comment) parts.push(<span className="tk-c" key="c">{comment}</span>);
  return parts;
}

function QueueCode() {
  return (
    <figure className="dd-code">
      <div className="dd-code-bar">
        <span className="dd-dots" aria-hidden><i /> <i /> <i /></span>
        <span className="mono">send-queue.mjs</span>
        <span className="mono dd-code-tag">illustrative · simplified</span>
      </div>
      <pre tabIndex={0} aria-label="Illustrative JavaScript for the slow, capped send queue">
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
      <figcaption>The pattern, written for this page. It is not the app's source.</figcaption>
    </figure>
  );
}

/* ===== B5 · Cost and risk ledger ================================================================== */

const ledger = [
  ["Find shops", "OpenStreetMap (Nominatim + Overpass)", "$0", "No key, no billing. Light use of a shared public service."],
  ["Fill gaps", "Google Places Text Search", "$0", "Hard cap of 900 calls a month, under the 1,000 free. The app refuses call 901."],
  ["Find emails", "Own crawler: homepage + contact pages", "$0", "Decodes obfuscated addresses, ranks info@ / same-domain first, drops junk."],
  ["Send", "Gmail API from my own account", "$0", "OAuth with the send-only scope: the app cannot read the inbox."],
  ["Pitch", "Explainer video, rendered locally", "$0", "Email cut is 4.4 MB; the app warns over 10 MB and refuses over 18 MB."],
  ["Comply", "CAN-SPAM basics", "—", "Opt-out line, optional mailing address, and a permanent do-not-email list."],
];

function Ledger() {
  return (
    <div className="fd-ledger" role="table" aria-label="Cost and risk ledger">
      <div className="fd-ledger-row fd-ledger-head" role="row">
        <span role="columnheader">Step</span>
        <span role="columnheader">How</span>
        <span role="columnheader">Cost</span>
        <span role="columnheader">Guardrail</span>
      </div>
      {ledger.map(([step, how, cost, guard]) => (
        <div className="fd-ledger-row" role="row" key={step}>
          <span role="cell" className="mono">{step}</span>
          <span role="cell">{how}</span>
          <span role="cell" className="fd-cost mono">{cost}</span>
          <span role="cell" className="muted">{guard}</span>
        </div>
      ))}
    </div>
  );
}

export function FrontDeskDeepDive() {
  return (
    <div className="dd">
      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">B1 · The business case</span>
          <h3>Start from the owner's economics</h3>
          <p>Before any code: what does a missed call cost a two-bay shop? Move the sliders.</p>
        </div>
        <MissedCallMath />
      </div>

      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">B2 · The product</span>
          <h3>A front desk that fits in a mechanic's pocket</h3>
          <p>Customers request a quote online; the owner gets one list to work, one tap per outcome, and texts that answer "is my car ready?" for them.</p>
        </div>
        <ProductFrames />
      </div>

      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">B3 · Go-to-market</span>
          <h3>Qualify before you pitch</h3>
          <p>The lead engine finds independent shops, reads their websites, and drops the ones that are a poor fit. Toggle the filters.</p>
        </div>
        <LeadFunnel />
      </div>

      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">B4 · Deliverability</span>
          <h3>Send like a person, not a blast</h3>
          <p>A slow, capped queue protects the sender's reputation and keeps every email personal: shop name and city are filled in, and the video is attached.</p>
        </div>
        <SendTimeline />
        <QueueCode />
      </div>

      <div className="dd-block">
        <div className="dd-head">
          <span className="mono">B5 · Unit economics</span>
          <h3>Near-zero cost per lead, by design</h3>
          <p>Every step uses a free source or a free tier with a hard cap in code, so the engine can run for months without a bill.</p>
        </div>
        <Ledger />
      </div>
    </div>
  );
}
