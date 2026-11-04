import { useReducedMotion } from "../hooks";

type NodeProps = { x: number; y: number; w?: number; h?: number; label: string; sub?: string; accent?: boolean; gold?: boolean };

/** A labelled box centred on (x, y). */
export function Node({ x, y, w = 150, h = 54, label, sub, accent, gold }: NodeProps) {
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={8}
        className={accent ? "box-accent" : "box"}
        style={gold ? { stroke: "rgb(226 182 83 / .6)", fill: "rgb(226 182 83 / .07)" } : undefined}
      />
      <text x={x} y={sub ? y - 3 : y + 4} textAnchor="middle" className="title" fontSize={13}>
        {label}
      </text>
      {sub && (
        <text x={x} y={y + 14} textAnchor="middle" className="muted-t" fontSize={10.5}>
          {sub}
        </text>
      )}
    </g>
  );
}

export function Wire({ d, accent, dashed }: { d: string; accent?: boolean; dashed?: boolean }) {
  return <path d={d} className={accent ? "wire-accent" : "wire"} strokeDasharray={dashed ? "4 4" : undefined} markerEnd={accent ? "url(#arrowA)" : "url(#arrow)"} />;
}

/** A dot travelling along a path, forever. Hidden when the visitor prefers reduced motion. */
export function Packet({ path, dur = 4, delay = 0, gold }: { path: string; dur?: number; delay?: number; gold?: boolean }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <circle r={3.6} className={gold ? "gold" : "dot"}>
      <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

export function Defs() {
  return (
    <defs>
      <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0.5 L7 4 L0 7.5" fill="none" stroke="rgb(148 170 195 / .5)" strokeWidth="1.2" />
      </marker>
      <marker id="arrowA" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0.5 L7 4 L0 7.5" fill="none" stroke="#6fd6c9" strokeWidth="1.2" />
      </marker>
    </defs>
  );
}

export function Diagram({ label, children, viewBox = "0 0 960 540" }: { label: string; children: React.ReactNode; viewBox?: string }) {
  return (
    <svg className="dg" viewBox={viewBox} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
      <Defs />
      {children}
    </svg>
  );
}

export function Caption({ x, y, children, anchor = "start" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="muted-t" fontSize={10.5} style={{ letterSpacing: ".08em", textTransform: "uppercase" }}>
      {children}
    </text>
  );
}
