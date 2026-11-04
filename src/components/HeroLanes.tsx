/**
 * Signature visual, in two parts.
 *
 * HeroLanes: faint pool lane ropes (dashed) behind the hero. Static.
 *
 * PaceRail: one length, aligned to the content grid above the proof strip. A pace light
 * swims the length, touches the wall (gold split mark) and fans out into three routes:
 * a race length turning into a system. Runs once on load; under reduced motion it is
 * drawn in its finished state.
 */
export function HeroLanes() {
  const ropes = Array.from({ length: 9 }, (_, i) => 70 + i * 92);
  return (
    <div className="hero-lanes" aria-hidden>
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ropeFade" x1="0" x2="1">
            <stop offset="0" stopColor="#94aac3" stopOpacity="0" />
            <stop offset="0.15" stopColor="#94aac3" stopOpacity="0.2" />
            <stop offset="0.85" stopColor="#94aac3" stopOpacity="0.2" />
            <stop offset="1" stopColor="#94aac3" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ropes.map((y) => (
          <line key={y} x1="0" x2="1440" y1={y} y2={y} stroke="url(#ropeFade)" strokeDasharray="3 9" />
        ))}
      </svg>
    </div>
  );
}

export function PaceRail() {
  const wall = 84; // % of width where the length ends
  const out = 97;
  const mid = 28;
  const fans = [6, 28, 50];
  return (
    <div className="pace-rail" aria-hidden>
      <svg>
        <defs>
          <linearGradient id="paceGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#6fd6c9" stopOpacity="0" />
            <stop offset="0.6" stopColor="#6fd6c9" stopOpacity="0.5" />
            <stop offset="1" stopColor="#9ae8de" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* the lane floor */}
        <line x1="0" x2={`${wall}%`} y1={mid} y2={mid} stroke="rgb(148 170 195 / .14)" />
        {/* the length */}
        <line className="pace" pathLength={1} style={{ ["--len" as string]: 1 }} x1="0" x2={`${wall}%`} y1={mid} y2={mid} stroke="url(#paceGrad)" strokeWidth="1.6" />
        {/* the touch */}
        <line className="pace-node" style={{ animationDelay: "2.8s" }} x1={`${wall}%`} x2={`${wall}%`} y1={mid - 13} y2={mid + 13} stroke="#e2b653" strokeWidth="2" />
        {/* the fan-out */}
        {fans.map((y, i) => (
          <g key={y}>
            <line
              className="pace"
              pathLength={1}
              style={{ ["--len" as string]: 1, animationDelay: `${3 + i * 0.12}s`, animationDuration: "0.7s" }}
              x1={`${wall}%`}
              y1={mid}
              x2={`${wall + 4}%`}
              y2={y}
              stroke="rgb(111 214 201 / .6)"
              strokeWidth="1.2"
            />
            <line
              className="pace"
              pathLength={1}
              style={{ ["--len" as string]: 1, animationDelay: `${3.5 + i * 0.12}s`, animationDuration: "0.7s" }}
              x1={`${wall + 4}%`}
              y1={y}
              x2={`${out}%`}
              y2={y}
              stroke="rgb(111 214 201 / .6)"
              strokeWidth="1.2"
            />
            <circle className="pace-node" style={{ animationDelay: `${4 + i * 0.12}s`, fill: "var(--bg)" }} cx={`${out + 0.6}%`} cy={y} r="4.5" stroke="#6fd6c9" strokeWidth="1.4" />
          </g>
        ))}
      </svg>
    </div>
  );
}
