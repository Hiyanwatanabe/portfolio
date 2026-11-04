import { Caption, Diagram, Node, Packet, Wire } from "./primitives";

// Simplified, generic architecture. Module names are descriptive; no hosts, paths or provider details.
export function Tf4Diagram() {
  const app = { x: 330, y: 130, w: 360, h: 300 };
  const mods = ["Target generator", "Scan service", "Matcher", "History checks", "Reconciliation", "Reserve (guarded)"];
  return (
    <Diagram label="Illustrative TF4 architecture: operators reach a Flask app behind Nginx; background jobs call a provider REST API through a resilient client and write to SQLite with run history and an activity log.">
      <Caption x={24} y={36}>Request path</Caption>
      <Node x={100} y={110} label="Operators" sub="browser · roles" />
      <Node x={100} y={230} label="Nginx" sub="TLS · reverse proxy" />
      <Node x={100} y={350} label="Gunicorn" sub="1 worker by design" />
      <Wire d="M 100 137 V 201" />
      <Wire d="M 100 257 V 321" />
      <Wire d={`M 175 350 H ${app.x - 2}`} />

      <rect x={app.x} y={app.y} width={app.w} height={app.h} rx={12} className="box" />
      <text x={app.x + 18} y={app.y + 28} className="title" fontSize={14}>Flask application</text>
      <text x={app.x + 18} y={app.y + 46} className="muted-t" fontSize={10.5}>blueprints · SQLAlchemy · auth</text>
      {mods.map((m, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = app.x + 18 + col * 170;
        const y = app.y + 66 + row * 58;
        const guarded = m.startsWith("Reserve");
        return (
          <g key={m}>
            <rect
              x={x}
              y={y}
              width={156}
              height={44}
              rx={7}
              className={guarded ? "box" : "box-accent"}
              style={guarded ? { stroke: "rgb(226 182 83 / .6)", strokeDasharray: "4 3" } : undefined}
            />
            <text x={x + 12} y={y + 27} fontSize={12} className="title">{m}</text>
          </g>
        );
      })}
      <text x={app.x + 18} y={app.y + 262} className="muted-t" fontSize={10.5}>jobs: run record · cursor · backoff · cooldown</text>
      <text x={app.x + 18} y={app.y + 280} fontSize={10.5} style={{ fill: "var(--gold)" }}>reserve: off in config AND requires caller flag</text>

      <Caption x={740} y={36}>Integrations &amp; state</Caption>
      <Node x={830} y={110} w={190} label="Provider REST API" sub="number registry (fictional)" />
      <Node x={830} y={220} w={210} label="API client" sub="retry · poll · redact logs" accent />
      <Node x={830} y={330} w={190} label="SQLite" sub="live tables · status history" />
      <Node x={830} y={440} w={190} label="Run history & audit" sub="who · what · when · result" />
      <Wire d={`M ${app.x + app.w} 220 H 723`} accent />
      <Wire d="M 830 193 V 139" accent />
      <Wire d={`M ${app.x + app.w} 330 H 733`} />
      <Wire d={`M ${app.x + app.w} 400 C 700 400, 700 440, 733 440`} />

      <Node x={510} y={490} w={360} h={44} label="CSV exports · dashboards · review queues" />
      <Wire d={`M 510 ${app.y + app.h} V 466`} />

      <Packet path={`M ${app.x + app.w} 220 H 830 V 110`} dur={2.6} />
      <Packet path={`M 830 110 V 220 H ${app.x + app.w}`} dur={2.6} delay={1.3} />
      <Packet path={`M ${app.x + app.w} 330 H 830`} dur={2} delay={0.5} />
      <Packet path="M 100 110 V 350 H 330" dur={3} delay={0.2} />
    </Diagram>
  );
}
