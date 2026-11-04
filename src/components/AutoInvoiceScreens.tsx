// Recreated interfaces with synthetic data. Not screenshots of the production application.
// Names (Client A, campaigns ALPHA/BRAVO), periods and amounts are invented.

function Window({ title, children, label }: { title: string; children: React.ReactNode; label: string }) {
  return (
    <div className="scr" role="group" aria-label={label}>
      <div className="scr-bar">
        <span className="dd-dots" aria-hidden><i /> <i /> <i /></span>
        <span className="mono">{title}</span>
        <span className="mono scr-tag">recreated · synthetic data</span>
      </div>
      {children}
    </div>
  );
}

const nav = ["Overview", "Clients", "Generate", "Templates", "Team", "Drive"];

export function OperatorScreen() {
  return (
    <Window title="auto-invoice / operator / generate" label="Recreated operator screen: generating an invoice for a synthetic client with a live preview of line items">
      <div className="scr-body scr-op" tabIndex={0}>
        <aside className="scr-side">
          <div className="scr-brand"><span /> Auto-Invoice</div>
          {nav.map((n) => (
            <div key={n} className="scr-nav" data-on={n === "Generate"}>{n}</div>
          ))}
          <div className="scr-drive">
            <span className="scr-led" /> Drive connected
            <small>last import · 31 files · 0 errors</small>
          </div>
        </aside>
        <main className="scr-main">
          <div className="scr-h">
            <div>
              <small>Generate</small>
              <b>New invoice</b>
            </div>
            <span className="scr-pill">Preview · not saved</span>
          </div>
          <div className="scr-form">
            <div><small>Client</small><span>Client A ▾</span></div>
            <div><small>Period</small><span>May 01 – May 31</span></div>
            <div><small>Template</small><span>Standard · v3</span></div>
            <div><small>Due</small><span>Net 15</span></div>
          </div>
          <div className="scr-flow mono">
            <span>248 rows</span><i>→</i><span>196 after filters</span><i>→</i><span>2 groups</span><i>→</i><span>2 lines</span>
          </div>
          <table className="scr-table">
            <thead><tr><th>Line</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
            <tbody>
              <tr><td>Billable events · ALPHA</td><td>1,412</td><td>0.50</td><td>706.00</td></tr>
              <tr><td>Billable events · BRAVO</td><td>64</td><td>0.50</td><td>40.00 <em>floor</em></td></tr>
            </tbody>
            <tfoot><tr><td colSpan={3}>Total</td><td>746.00</td></tr></tfoot>
          </table>
          <div className="scr-actions">
            <span className="scr-btn ghost">Re-run preview</span>
            <span className="scr-btn">Create &amp; publish</span>
          </div>
        </main>
      </div>
    </Window>
  );
}

export function ClientScreen() {
  const items = [
    { p: "May 2026", s: "Published", v: "v1", t: "746.00" },
    { p: "Apr 2026", s: "Payment recorded", v: "v2", t: "702.50" },
    { p: "Mar 2026", s: "Payment recorded", v: "v1", t: "688.00" },
  ];
  return (
    <Window title="auto-invoice / client" label="Recreated client portal: a synthetic client's invoices with status and PDF versions">
      <div className="scr-body scr-client" tabIndex={0}>
        <div className="scr-h">
          <div>
            <small>Client portal</small>
            <b>Client A · Invoices</b>
          </div>
          <span className="scr-pill">Signed in · client role</span>
        </div>
        <ul className="scr-list">
          {items.map((i) => (
            <li key={i.p}>
              <div>
                <b>{i.p}</b>
                <small>Due 15 days after issue</small>
              </div>
              <span className="scr-status" data-s={i.s === "Published" ? "pub" : "paid"}>{i.s}</span>
              <span className="mono scr-amt">{i.t}</span>
              <span className="scr-btn ghost">PDF {i.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

export function PdfScreen() {
  return (
    <div className="scr-pdf" role="img" aria-label="Recreated invoice PDF with synthetic data">
      <div className="scr-pdf-page">
        <div className="scr-pdf-wm" aria-hidden />
        <div className="scr-pdf-head">
          <b>INVOICE</b>
          <span className="mono">Period 05/01 – 05/31</span>
        </div>
        <div className="scr-pdf-meta">
          <div><small>Bill to</small><span>Client A</span></div>
          <div><small>Issued</small><span>06/01</span></div>
          <div><small>Due</small><span>06/16</span></div>
        </div>
        <table>
          <thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Billable events · ALPHA</td><td>1,412</td><td>0.50</td><td>706.00</td></tr>
            <tr><td>Billable events · BRAVO</td><td>64</td><td>0.50</td><td>40.00</td></tr>
          </tbody>
        </table>
        <div className="scr-pdf-total"><span>Total</span><b>746.00</b></div>
        <div className="scr-pdf-foot mono">generated · pdf-lib · document v1</div>
      </div>
    </div>
  );
}

export function AutoInvoiceGallery() {
  return (
    <div className="scr-gallery">
      <figure className="scr-fig scr-wide">
        <OperatorScreen />
        <figcaption>Operator view: pick client, period and template, and see the engine's preview before anything is written.</figcaption>
      </figure>
      <figure className="scr-fig">
        <ClientScreen />
        <figcaption>Client portal: their invoices, status and every PDF version.</figcaption>
      </figure>
      <figure className="scr-fig">
        <PdfScreen />
        <figcaption>The generated document, rendered server-side with pdf-lib.</figcaption>
      </figure>
      <p className="ai-note">Recreated interfaces with invented names, periods and amounts. Not screenshots of the production system.</p>
    </div>
  );
}
