/** "02 — Selected work" followed by a lane rule that ends in a T, like the wall end of a pool lane. */
export function LaneLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="lane-label">
      <span className="num">{n}</span>
      <span>{children}</span>
      <span className="t-cap" aria-hidden />
    </p>
  );
}
