// A recreated, simplified interface with synthetic data. Not a screenshot of the production system.
const runs = [
  { id: "R-1042", job: "Scan · target set A", items: "2,400", found: "37", status: "ok", label: "Completed" },
  { id: "R-1041", job: "History check · watchlist", items: "860", found: "12", status: "ok", label: "Completed" },
  { id: "R-1040", job: "Reconcile · owned inventory", items: "5,120", found: "4 diffs", status: "warn", label: "Review" },
  { id: "R-1039", job: "Scan · target set B", items: "1,950", found: "—", status: "run", label: "Running 64%" },
  { id: "R-1038", job: "Reserve · queue", items: "0", found: "—", status: "off", label: "Disabled" },
];

export function Tf4Mock() {
  return (
    <div className="mock">
      <div className="mock-window">
        <div className="mock-bar">
          <i /> <i /> <i /> <span>tf4 / runs · illustrative demo, synthetic data</span>
        </div>
        <div className="mock-body" tabIndex={0} role="region" aria-label="Illustrative TF4 run history, synthetic data">
          <div className="mock-kpis">
            <div><span>Jobs today</span><b>18</b></div>
            <div><span>Items checked</span><b>10,330</b></div>
            <div><span>Needs review</span><b>4</b></div>
            <div><span>Auto reserve</span><b style={{ color: "var(--muted)" }}>Off</b></div>
          </div>
          <table>
            <thead>
              <tr><th>Run</th><th>Job</th><th>Items</th><th>Result</th><th>Status</th></tr>
            </thead>
            <tbody>
              {runs.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td><td>{r.job}</td><td>{r.items}</td><td>{r.found}</td>
                  <td><span className={`status ${r.status}`}>{r.label}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
