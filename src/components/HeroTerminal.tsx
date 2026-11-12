/**
 * A small terminal next to the portrait. The full text is in the HTML (search engines and no-JS
 * visitors see it); CSS types each line in on load, and shows it finished under reduced motion.
 */
const stack = ["python", "sql", "typescript", "react", "next.js", "flask", "aws", "linux"];
const repos = ["tf4/", "auto-invoice/", "cognisense/", "market-hunter/"];

const lines: { cmd: string; out: React.ReactNode }[] = [
  { cmd: "whoami", out: <>hiyan.kubagawa <span className="t-dim">· full-stack · sysadmin</span></> },
  {
    cmd: "ls ~/stack --prod",
    out: (
      <span className="t-grid">
        {stack.map((s) => <span key={s} className="t-tok">{s}</span>)}
      </span>
    ),
  },
  {
    cmd: "ls ~/systems",
    out: (
      <span className="t-grid">
        {repos.map((r) => <span key={r} className="t-dir">{r}</span>)}
        <span className="t-dim">+ 4 more</span>
      </span>
    ),
  },
];

export function HeroTerminal() {
  return (
    <div className="term" role="img" aria-label="Terminal: whoami returns hiyan.kubagawa, full-stack engineer and sysadmin; the production stack lists Python, SQL, TypeScript, React, Next.js, Flask, AWS and Linux; the systems folder lists TF4, Auto-Invoice, CogniSense, Market Hunter and four more.">
      <div className="term-bar" aria-hidden>
        <span className="dd-dots"><i /> <i /> <i /></span>
        <span className="mono">hiyan@cleveland: ~</span>
        <span className="mono t-ok"><i className="t-led" /> online</span>
      </div>
      <div className="term-body mono" aria-hidden>
        {lines.map((l, i) => (
          <div className="term-line" key={l.cmd} style={{ ["--i" as string]: i }}>
            <div className="term-cmd">
              <span className="t-prompt">~ $</span> <span className="t-type" style={{ ["--n" as string]: l.cmd.length }}>{l.cmd}</span>
            </div>
            <div className="term-out">{l.out}</div>
          </div>
        ))}
        <div className="term-cmd term-last" style={{ ["--i" as string]: lines.length }}>
          <span className="t-prompt">~ $</span> <span className="t-caret" />
        </div>
      </div>
    </div>
  );
}
