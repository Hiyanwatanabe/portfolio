/**
 * A small terminal next to the portrait. The full text is in the HTML (search engines and no-JS
 * visitors see it); CSS types each line in on load, and shows it finished under reduced motion.
 */
const lines: { cmd: string; out: React.ReactNode }[] = [
  { cmd: "whoami", out: <>hiyan.kubagawa <span className="t-dim">· full-stack + sysadmin</span></> },
  { cmd: "uptime --career", out: <>in production since 2025 <span className="t-dim">· B.S. CS ’25</span></> },
  {
    cmd: "systemctl status --all",
    out: (
      <span className="t-services">
        <span><i className="t-led" /> tf4</span>
        <span><i className="t-led" /> auto-invoice</span>
        <span><i className="t-led t-led-gold" /> front-desk</span>
      </span>
    ),
  },
];

export function HeroTerminal() {
  return (
    <div className="term" role="img" aria-label="Terminal: whoami returns hiyan.kubagawa, full-stack and sysadmin; uptime shows production systems since 2025; status lists TF4, Auto-Invoice and Front Desk running.">
      <div className="term-bar" aria-hidden>
        <span className="dd-dots"><i /> <i /> <i /></span>
        <span className="mono">hiyan@cleveland: ~</span>
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
