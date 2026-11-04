import { Link } from "react-router-dom";
import { useMeta } from "../hooks";

export default function NotFound() {
  useMeta("Not found · Hiyan Kubagawa", "This page does not exist.");
  return (
    <section className="section">
      <div className="container">
        <p className="lane-label"><span className="num">404</span><span>Wrong lane</span></p>
        <h1 style={{ fontSize: "var(--step-4)" }}>This page doesn't exist.</h1>
        <p className="muted" style={{ marginTop: "1rem" }}>
          <Link className="text-link" to="/">Back to the homepage</Link>
        </p>
      </div>
    </section>
  );
}
