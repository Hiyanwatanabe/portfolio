/** "02 — Selected work" followed by a lane rule that ends in a T, like the wall end of a pool lane.
 *  The visible text decodes like terminal output when it scrolls in (see effects.ts). */
export function LaneLabel({ n, children }: { n: string; children: React.ReactNode }) {
  const text = typeof children === "string" ? children : null;
  return (
    <p className="lane-label">
      <span className="num">{n}</span>
      {text ? (
        <>
          <span data-scramble aria-hidden>{text}</span>
          <span className="visually-hidden">{text}</span>
        </>
      ) : (
        <span>{children}</span>
      )}
      <span className="t-cap" aria-hidden />
    </p>
  );
}
