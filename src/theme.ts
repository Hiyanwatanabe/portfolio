// Theme state shared by the header switch and the command palette.
// Dark is the default; index.html applies a stored choice before first paint.
export type Theme = "dark" | "light";

export const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export function setTheme(next: Theme) {
  const root = document.documentElement;
  if (next === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f3f5f7" : "#0a0f15");
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* private mode: the choice lasts for this page only */
  }
  window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
}

export const toggleTheme = () => setTheme(getTheme() === "light" ? "dark" : "light");
