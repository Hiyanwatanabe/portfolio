/**
 * Domain map for confidential work: the engineering domains a project involves, laid on pool lanes
 * and joined by a single pace line. Deliberately abstract. It shows what kinds of engineering the
 * work involves, never how any system is built.
 */
export function SpecVisual({ title, domains, stack }: { title: string; domains: string[]; stack: string[] }) {
  const W = 960;
  const H = 660;
  const lanes = [150, 220, 290, 360, 430, 500];
  const top = 255;
  const bottom = 430;
  const items = domains.slice(0, 6);
  const step = (W - 220) / Math.max(1, items.length - 1);
  const pts = items.map((d, i) => ({ d, x: 110 + i * step, y: i % 2 === 0 ? top : bottom, up: i % 2 === 0 }));
  const path = pts
    .map((p, i) => (i === 0 ? `M 40 ${p.y} L ${p.x} ${p.y}` : `C ${pts[i - 1].x + step / 2} ${pts[i - 1].y}, ${p.x - step / 2} ${p.y}, ${p.x} ${p.y}`))
    .join(" ");
  return (
    <svg className="dg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title}: engineering domains (${domains.join(", ")})`} preserveAspectRatio="xMidYMid meet">
      <text x={40} y={70} fontSize={17} className="muted-t" style={{ letterSpacing: ".14em", textTransform: "uppercase" }}>
        Engineering domains
      </text>
      <text x={W - 40} y={70} fontSize={17} textAnchor="end" style={{ fill: "var(--gold)", letterSpacing: ".1em" }}>
        DOMAIN VIEW
      </text>
      {lanes.map((y) => (
        <line key={y} x1={40} x2={W - 40} y1={y} y2={y} stroke="rgb(148 170 195 / .18)" strokeDasharray="3 9" />
      ))}
      <line x1={W - 40} x2={W - 40} y1={lanes[0]} y2={lanes[lanes.length - 1]} stroke="rgb(148 170 195 / .25)" />
      <path d={path} fill="none" stroke="#6fd6c9" strokeOpacity={0.75} strokeWidth={2.2} />
      {pts.map((p) => {
        const w = p.d.length * 11 + 40;
        const cy = p.up ? p.y - 46 : p.y + 46;
        const left = Math.min(Math.max(p.x - w / 2, 30), W - 30 - w);
        return (
          <g key={p.d}>
            <line x1={p.x} x2={p.x} y1={p.y} y2={p.up ? cy + 19 : cy - 19} stroke="rgb(111 214 201 / .45)" />
            <circle cx={p.x} cy={p.y} r={7} fill="#0a0f15" stroke="#6fd6c9" strokeWidth={2.2} />
            <rect x={left} y={cy - 19} width={w} height={38} rx={19} className="box-accent" />
            <text x={left + w / 2} y={cy + 6.5} textAnchor="middle" fontSize={19} className="title">
              {p.d}
            </text>
          </g>
        );
      })}
      <line x1={40} x2={W - 40} y1={H - 96} y2={H - 96} stroke="rgb(148 170 195 / .2)" />
      <text x={40} y={H - 52} fontSize={20}>
        {stack.slice(0, 6).join("  ·  ")}
      </text>
    </svg>
  );
}
