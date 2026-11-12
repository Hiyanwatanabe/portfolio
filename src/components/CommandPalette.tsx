import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { toggleTheme } from "../theme";

type Command = { id: string; group: string; label: string; hint?: string; run: () => void };

/** Ctrl/⌘ + K (or "/") opens a command palette: jump anywhere, switch theme, copy email, get the résumé. */
export function CommandPalette() {
  const navigate = useNavigate();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");

  const commands = useMemo<Command[]>(() => {
    const go = (path: string, hash = "") => () => navigate({ pathname: path, hash });
    const sections: [string, string][] = [
      ["work", "Selected work"],
      ["stack", "Interface to infrastructure"],
      ["business", "Business lens"],
      ["experience", "Experience"],
      ["skills", "Toolkit"],
      ["about", "About"],
      ["education", "Education & credentials"],
      ["contact", "Contact"],
    ];
    return [
      ...sections.map(([id, label]) => ({ id: `s-${id}`, group: "Go to", label, hint: `#${id}`, run: go("/", `#${id}`) })),
      { id: "p-about", group: "Go to", label: "The full story", hint: "/about", run: go("/about/") },
      ...projects.map((p) => ({ id: `p-${p.slug}`, group: "Case studies", label: p.title, hint: p.kicker, run: go(`/work/${p.slug}/`) })),
      { id: "a-theme", group: "Actions", label: "Toggle light / dark mode", hint: "theme", run: toggleTheme },
      {
        id: "a-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => setToast("Email copied"),
            () => setToast(profile.email),
          );
        },
      },
      { id: "a-resume", group: "Actions", label: "Download résumé (PDF)", hint: "pdf", run: () => window.open(`${import.meta.env.BASE_URL}${profile.resume}`, "_blank", "noopener") },
      { id: "a-linkedin", group: "Links", label: "LinkedIn", hint: "linkedin.com", run: () => window.open(profile.linkedin, "_blank", "noopener") },
      { id: "a-github", group: "Links", label: "GitHub", hint: "github.com/Hiyanwatanabe", run: () => window.open(profile.github, "_blank", "noopener") },
    ];
  }, [navigate]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.group} ${c.label} ${c.hint ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  const open = () => {
    setQuery("");
    setIndex(0);
    dialog.current?.showModal();
    input.current?.focus();
  };
  const close = () => dialog.current?.close();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // "/" types normally inside form fields, except the palette's own (closed) search box.
      const typing = target?.closest?.("input, textarea, [contenteditable]") && !target.closest(".palette");
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (dialog.current?.open) close();
        else open();
      } else if (e.key === "/" && !typing && !dialog.current?.open) {
        e.preventDefault();
        open();
      }
    };
    const onOpen = () => open();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const run = (c: Command | undefined) => {
    if (!c) return;
    close();
    c.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[index]);
    }
  };

  useEffect(() => {
    document.getElementById(`cmd-${results[index]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [index, results]);

  let lastGroup = "";
  return (
    <>
      <dialog ref={dialog} className="palette" aria-label="Command palette" onClick={(e) => e.target === dialog.current && close()}>
        <div className="palette-inner">
          <div className="palette-input">
            <span className="mono palette-prompt" aria-hidden>❯</span>
            <input
              ref={input}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIndex(0);
              }}
              onKeyDown={onKeyDown}
              placeholder="Jump to a project, section or action…"
              aria-label="Search commands"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
            />
            <kbd className="mono">esc</kbd>
          </div>
          <ul id="palette-list" className="palette-list" role="listbox" aria-label="Commands">
            {results.map((c, i) => {
              const head = c.group !== lastGroup ? c.group : "";
              lastGroup = c.group;
              return (
                <li key={c.id} role="presentation">
                  {head && <span className="palette-group mono" aria-hidden>{head}</span>}
                  <div
                    id={`cmd-${c.id}`}
                    role="option"
                    aria-selected={i === index}
                    className="palette-item"
                    onMouseMove={() => setIndex(i)}
                    onClick={() => run(c)}
                  >
                    <span>{c.label}</span>
                    {c.hint && <span className="palette-hint mono">{c.hint}</span>}
                  </div>
                </li>
              );
            })}
            {results.length === 0 && <li className="palette-empty mono">No match. Try "tf4", "theme" or "contact".</li>}
          </ul>
          <div className="palette-foot mono" aria-hidden>
            <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
            <span><kbd>↵</kbd> run</span>
            <span><kbd>/</kbd> or <kbd>Ctrl K</kbd> open</span>
          </div>
        </div>
      </dialog>
      <div className="palette-toast mono" role="status" data-show={Boolean(toast)}>{toast}</div>
    </>
  );
}

/** The header button that opens the palette (also says the shortcut exists). */
export function PaletteButton() {
  return (
    <button type="button" className="palette-btn" onClick={() => window.dispatchEvent(new Event("open-palette"))} aria-label="Command palette, Ctrl K" title="Command palette (Ctrl K)">
      <span className="mono palette-btn-prompt" aria-hidden>❯_</span>
      <kbd className="mono" aria-hidden>Ctrl K</kbd>
    </button>
  );
}
