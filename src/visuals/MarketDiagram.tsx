import { Caption, Diagram, Node, Wire } from "./primitives";

const stages: [string, string][] = [
  ["Preflight", "read-only checks"],
  ["Market data", "incremental · Parquet"],
  ["Validation", "gaps · freshness"],
  ["Strategy research", "costs · slippage"],
  ["Paper account", "capital-capped"],
];
const guards = ["paper endpoint only", "live-style keys refused", "non-GET to unknown hosts raises", "secrets redacted from logs", "engine capital capped"];

export function MarketDiagram() {
  const xs = [110, 290, 470, 650, 830];
  return (
    <Diagram label="Market Hunter research pipeline: read-only preflight, incremental market data in Parquet, validation, strategy research with costs and slippage, and a capital-capped paper account, behind code-level guards against live trading.">
      <Caption x={24} y={36}>Research engine · Python</Caption>
      {stages.map(([l, s], i) => (
        <g key={l}>
          <Node x={xs[i]} y={170} w={160} label={l} sub={s} accent={i === 3} />
          {i < stages.length - 1 && <Wire d={`M ${xs[i] + 80} 170 H ${xs[i + 1] - 82}`} />}
        </g>
      ))}
      {xs.map((x) => (
        <line key={x} x1={x} x2={x} y1={198} y2={298} stroke="rgb(226 182 83 / .35)" strokeDasharray="2 4" />
      ))}
      <rect x={30} y={300} width={900} height={120} rx={12} fill="rgb(226 182 83 / .05)" stroke="rgb(226 182 83 / .5)" strokeDasharray="5 4" />
      <text x={50} y={332} className="title" fontSize={13}>Guard layer, enforced where requests are made</text>
      {guards.map((g, i) => (
        <text key={g} x={50 + (i % 3) * 290} y={366 + Math.floor(i / 3) * 26} fontSize={11.5}>· {g}</text>
      ))}
      <text x={24} y={490} fontSize={10.5} className="muted-t">Paper trading only. No live trading path exists; no returns are claimed.</text>
    </Diagram>
  );
}
