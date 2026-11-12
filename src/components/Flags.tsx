import { useId } from "react";

/* Simplified flags drawn as SVG, so they stay sharp and can be rendered as an LED dot matrix.
 * Japan: heritage. Brazil: born and raised in São Paulo. United States: studied and works here. */

type Box = { x: number; y: number; w: number; h: number };

function Japan({ x, y, w, h }: Box) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#f4f4f2" />
      <circle cx={x + w / 2} cy={y + h / 2} r={h * 0.3} fill="#d3203a" />
    </g>
  );
}

function Brazil({ x, y, w, h }: Box) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const r = h * 0.21;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#079b47" />
      <polygon points={`${cx},${y + h * 0.1} ${x + w * 0.92},${cy} ${cx},${y + h * 0.9} ${x + w * 0.08},${cy}`} fill="#fedd00" />
      <circle cx={cx} cy={cy} r={r} fill="#012a7a" />
      <path d={`M ${cx - r} ${cy + r * 0.05} Q ${cx} ${cy - r * 0.55} ${cx + r} ${cy + r * 0.25}`} stroke="#fff" strokeWidth={h * 0.035} fill="none" />
    </g>
  );
}

function USA({ x, y, w, h }: Box) {
  const stripe = h / 13;
  const cw = w * 0.4;
  const ch = stripe * 7;
  return (
    <g>
      {Array.from({ length: 13 }, (_, i) => (
        <rect key={i} x={x} y={y + i * stripe} width={w} height={stripe + 0.3} fill={i % 2 ? "#f4f4f2" : "#c8102e"} />
      ))}
      <rect x={x} y={y} width={cw} height={ch} fill="#0a3161" />
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 6 }, (_, c) => (
          <circle key={`${r}-${c}`} cx={x + cw * ((c + 0.6) / 6.2)} cy={y + ch * ((r + 0.6) / 5.2)} r={Math.max(0.6, h * 0.012)} fill="#f4f4f2" />
        )),
      )}
    </g>
  );
}

/** Tiny flags for inline use (hero line, labels). */
export function MiniFlags() {
  const f = { y: 0, w: 18, h: 12 };
  return (
    <span className="mini-flags" aria-hidden>
      <svg viewBox="0 0 18 12"><Brazil x={0} {...f} /></svg>
      <svg viewBox="0 0 18 12"><Japan x={0} {...f} /></svg>
      <svg viewBox="0 0 18 12"><USA x={0} {...f} /></svg>
    </span>
  );
}

/**
 * Three diagonal panels (Japan · Brazil · United States) rendered through an LED dot-matrix mask,
 * with a scan line and the route São Paulo → Erie → Cleveland.
 */
export function FlagPanel() {
  const id = useId().replace(/:/g, "");
  const W = 600;
  const H = 240;
  const s = 46; // slant
  const bands = [
    { pts: `0,0 ${210 + s},0 ${210},${H} 0,${H}`, Flag: Japan, box: { x: 0, y: 0, w: 260, h: H }, label: "JP", sub: "heritage" },
    { pts: `${210 + s},0 ${410 + s},0 ${410},${H} ${210},${H}`, Flag: Brazil, box: { x: 190, y: 0, w: 290, h: H }, label: "BR", sub: "São Paulo · born" },
    { pts: `${410 + s},0 ${W},0 ${W},${H} ${410},${H}`, Flag: USA, box: { x: 400, y: 0, w: 220, h: H }, label: "US", sub: "Erie → Cleveland" },
  ];
  return (
    <figure className="flagpanel">
      <svg viewBox={`0 0 ${W} ${H + 46}`} role="img" aria-label="Japan, Brazil and United States flags as an LED dot matrix: Japanese heritage, born in São Paulo, studying in Erie and working in Cleveland">
        <defs>
          <pattern id={`dots-${id}`} width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2.15" fill="#fff" />
          </pattern>
          <mask id={`led-${id}`}>
            <rect width={W} height={H} fill={`url(#dots-${id})`} />
          </mask>
          {bands.map((b, i) => (
            <clipPath id={`band-${id}-${i}`} key={i}>
              <polygon points={b.pts} />
            </clipPath>
          ))}
          <linearGradient id={`fade-${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        <rect width={W} height={H} rx={10} className="flag-bed" />
        {/* faint full-colour layer so the shapes read, then the bright LED layer on top */}
        <g opacity={0.16}>
          {bands.map((b, i) => (
            <g clipPath={`url(#band-${id}-${i})`} key={i}><b.Flag {...b.box} /></g>
          ))}
        </g>
        <g mask={`url(#led-${id})`} className="flag-led">
          {bands.map((b, i) => (
            <g clipPath={`url(#band-${id}-${i})`} key={i}><b.Flag {...b.box} /></g>
          ))}
        </g>
        <rect width={W} height={H} fill={`url(#fade-${id})`} />
        {bands.slice(1).map((_, i) => (
          <line key={i} x1={i ? 410 + s : 210 + s} y1={0} x2={i ? 410 : 210} y2={H} className="flag-seam" />
        ))}

        {/* route */}
        <path d="M 300 150 C 360 70, 450 60, 505 92 S 545 120, 560 112" className="flag-route" />
        <circle cx={300} cy={150} r={5} className="flag-node" />
        <circle cx={505} cy={92} r={4} className="flag-node" />
        <circle cx={560} cy={112} r={5.5} className="flag-node flag-node-now" />
        <rect className="flag-scan" x={0} y={0} width={W} height={18} />

        {bands.map((b, i) => (
          <g key={b.label} transform={`translate(${[18, 238, 448][i]}, ${H + 28})`}>
            <text className="flag-code">{b.label}</text>
            <text x={30} className="flag-sub">{b.sub}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
