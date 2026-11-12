import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+=<>/\\|";

/** Decode a label from random glyphs to its text, like a terminal resolving output. */
function scramble(el: HTMLElement) {
  const final = el.dataset.text ?? el.textContent ?? "";
  el.dataset.text = final;
  const start = performance.now();
  const dur = 650;
  const frame = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    const settled = Math.floor(final.length * p);
    let out = "";
    for (let i = 0; i < final.length; i++) {
      const ch = final[i];
      out += i < settled || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = final;
  };
  requestAnimationFrame(frame);
}

/**
 * Site-wide "tech" effects, all decorative and all skipped under reduced motion:
 * - cursor spotlight: elements with .spot get --mx/--my for a glow that follows the pointer
 * - lane labels decode when they scroll into view
 */
export function useSiteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      raf = 0;
      if (!last) return;
      const el = (last.target as Element | null)?.closest?.<HTMLElement>(".spot");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${last.clientX - r.left}px`);
      el.style.setProperty("--my", `${last.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (reduced() || !("IntersectionObserver" in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-scramble]"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            scramble(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.6 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}
