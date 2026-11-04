import { Caption, Diagram, Node, Packet, Wire } from "./primitives";

// Simplified architecture of Auto-Invoice. Generic names only: no clients, rates or data.
export function AutoInvoiceDiagram() {
  const app = { x: 250, y: 70, w: 410, h: 400 };
  const handlers: [string, string][] = [
    ["POST /api/google/ingest", "Drive → rows"],
    ["POST /api/invoices/preview", "dry-run invoice"],
    ["POST /api/invoices/create", "saga + 409 guard"],
    ["POST /api/payments", "token · role check"],
  ];
  const libs: [string, string][] = [
    ["Rules engine", "alias → filter → group → price"],
    ["Mapping cascade", "exact → prefix → regex"],
    ["PDF builder", "pdf-lib · versioned"],
  ];
  return (
    <Diagram label="Auto-Invoice architecture: operator and client portals call a Next.js App Router application whose route handlers ingest spreadsheets from Google Drive, run a rules engine, create invoices with compensating rollback and render PDFs; data, auth and documents live in Supabase Postgres, Auth and Storage.">
      <Caption x={24} y={36}>Users &amp; sources</Caption>
      <Caption x={app.x} y={36}>Next.js 16 · App Router</Caption>
      <Caption x={720} y={36}>Supabase</Caption>

      <Node x={115} y={120} w={170} label="Operator portal" sub="templates · team" accent />
      <Node x={115} y={220} w={170} label="Client portal" sub="client role only" />
      <Node x={115} y={400} w={170} label="Google Drive" sub="OAuth 2.0 · daily XLSX" gold />
      <Wire d={`M 200 120 H ${app.x - 2}`} accent />
      <Wire d={`M 200 220 H ${app.x - 2}`} />
      <Wire d={`M 200 400 C 225 400, 225 160, ${app.x + 18} 160`} dashed />

      <rect x={app.x} y={app.y} width={app.w} height={app.h} rx={12} className="box" />
      <rect x={app.x + 14} y={app.y + 14} width={app.w - 28} height={30} rx={6} className="box-accent" />
      <text x={app.x + 28} y={app.y + 34} fontSize={11.5} className="title">proxy</text>
      <text x={app.x + 76} y={app.y + 34} fontSize={10.5} className="muted-t">refreshes session cookies on each request</text>

      <text x={app.x + 18} y={app.y + 70} fontSize={10.5} className="muted-t" style={{ letterSpacing: ".08em" }}>ROUTE HANDLERS</text>
      {handlers.map(([l, s], i) => {
        const x = app.x + 14 + (i % 2) * 196;
        const y = app.y + 80 + Math.floor(i / 2) * 58;
        return (
          <g key={l}>
            <rect x={x} y={y} width={186} height={48} rx={7} className="box-accent" />
            <text x={x + 12} y={y + 21} fontSize={11.5} className="title">{l}</text>
            <text x={x + 12} y={y + 37} fontSize={10} className="muted-t">{s}</text>
          </g>
        );
      })}
      <text x={app.x + 18} y={app.y + 222} fontSize={10.5} className="muted-t" style={{ letterSpacing: ".08em" }}>DOMAIN LIBRARY (PURE TYPESCRIPT)</text>
      {libs.map(([l, s], i) => (
        <g key={l}>
          <rect x={app.x + 14} y={app.y + 232 + i * 50} width={app.w - 28} height={42} rx={7} className="box" style={i === 0 ? { stroke: "rgb(111 214 201 / .55)" } : undefined} />
          <text x={app.x + 28} y={app.y + 258 + i * 50} fontSize={12} className="title">{l}</text>
          <text x={app.x + app.w - 28} y={app.y + 258 + i * 50} fontSize={10.5} textAnchor="end" className="muted-t">{s}</text>
        </g>
      ))}

      <Node x={820} y={120} w={210} label="Auth" sub="users · profiles · roles" />
      <Node x={820} y={250} w={210} h={74} label="Postgres" sub="stats · invoices · ledger" accent />
      <Node x={820} y={390} w={210} label="Storage" sub="invoice PDFs, per version" />
      <Wire d={`M ${app.x + app.w} 120 H 713`} />
      <Wire d={`M ${app.x + app.w} 250 H 713`} accent />
      <Wire d={`M ${app.x + app.w} 390 H 713`} />
      <text x={668} y={240} fontSize={10} className="muted-t">upsert</text>

      <text x={24} y={510} fontSize={10.5} className="muted-t">Service-role key used only inside route handlers · browser code never sees it</text>

      <Packet path={`M 200 400 C 225 400, 225 160, ${app.x + 18} 160 H ${app.x + app.w} V 250 H 820`} dur={4.4} gold />
      <Packet path={`M 200 120 H ${app.x + 210} V 238 H 820`} dur={3.6} delay={1.2} />
      <Packet path={`M ${app.x + app.w} 390 H 820`} dur={2.2} delay={0.6} />
    </Diagram>
  );
}
