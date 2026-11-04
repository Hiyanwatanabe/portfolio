import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";

const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Built pages arrive pre-rendered (scripts/prerender.mjs): React takes over the existing HTML.
// The dev server sends an empty root, so it renders from scratch.
const root = document.getElementById("root")!;
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
