// Projects and case studies.
//
// Professional work is "confidential": it is described by role, engineering domains, technologies
// and general engineering principles only. It never names internal systems, counts, hardware,
// schedules, architecture, routing, vendors, data or business strategy, and it has no diagrams.
// Research and independent projects are public and carry full technical depth.

export type VisualKey = "spec" | "cognisense" | "market" | "portfolio";
export type Layer = "frontend" | "api" | "backend" | "data" | "infra";

type Base = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  context: "Professional" | "Research" | "Independent";
  org: string;
  period: string;
  role: string;
  stack: string[];
  layers: Layer[]; // which parts of the stack this project demonstrates
  visual: VisualKey;
  links?: { label: string; href: string }[];
};

export type ConfidentialProject = Base & {
  confidential: true;
  domains: string[];
  responsibilities: string[];
  principles: { title: string; body: string }[];
};

export type PublicProject = Base & {
  confidential: false;
  image?: "cognisense";
  problem: string;
  approach: string[];
  features: string[];
  challenges: { title: string; body: string }[];
  outcomes: string[];
};

export type Project = ConfidentialProject | PublicProject;

const employer = "National Sales Partners";

export const projects: Project[] = [
  {
    slug: "operations-automation",
    confidential: true,
    title: "Operations Automation Platform",
    kicker: "Internal full-stack application for telecom workflow automation",
    summary:
      "Designed and developed internal software that supports operational automation, API integration, data processing and workflow management, from the database and backend services to the interface the team works in.",
    context: "Professional",
    org: employer,
    period: "2025 — Present",
    role: "Designed, built and maintain it",
    stack: ["Python", "Flask", "SQL", "REST APIs", "JavaScript", "HTML / CSS", "AWS", "Linux"],
    layers: ["frontend", "api", "backend", "data", "infra"],
    visual: "spec",
    domains: ["Full-stack development", "API integration", "Data processing", "Workflow automation", "Access control", "Cloud deployment"],
    responsibilities: [
      "Designed the application end to end: data model, backend services, web interface and access control.",
      "Integrated an external provider's REST API into day-to-day workflows, with error handling built in from the start.",
      "Built background processing for long-running work, with a reviewable history of what each job did.",
      "Added accounts, role-based permissions and an activity log.",
      "Deploy and operate it on cloud Linux infrastructure, with backups and documented release and rollback steps.",
    ],
    principles: [
      { title: "Safe by default", body: "Anything that changes an external system stays off until someone deliberately turns it on." },
      { title: "Every job leaves a record", body: "Automation people can't inspect is automation people stop trusting. Runs, results and errors are visible." },
      { title: "Small, reversible releases", body: "Changes ship in small pieces, with a backup and a known way back." },
    ],
  },
  {
    slug: "communication-systems",
    confidential: true,
    title: "Communication Systems Modernization",
    kicker: "Contact-center platform migration, integrations and reporting",
    summary:
      "Supported the modernization of enterprise communication systems through technical integrations, routing configuration, workflow validation, operational reporting and production troubleshooting.",
    context: "Professional",
    org: employer,
    period: "2025 — Present",
    role: "Engineer on the migration team",
    stack: ["NICE", "Mitel", "Next.js", "React", "Node.js", "Python", "SQL", "AWS"],
    layers: ["frontend", "api", "backend", "data", "infra"],
    visual: "spec",
    domains: ["Telecommunications", "IVR & call routing", "System integration", "Web development", "Operational reporting", "Production support"],
    responsibilities: [
      "Configure, test and troubleshoot inbound routing and IVR behavior while services move between platforms.",
      "Build integrations and internal web tools that connect the contact-center platform with other business systems.",
      "Rebuild operational reports and dashboards on the new platform's data.",
      "Validate changes end to end before and after they go live, and investigate production issues when they don't behave.",
    ],
    principles: [
      { title: "Nothing breaks mid-migration", body: "Every change is tested before it reaches callers and checked again after." },
      { title: "Fail toward a person", body: "When an automated step can't decide, the safe outcome is a human, not a dead end." },
      { title: "Reports people already trust", body: "New data sources are matched against the numbers the business already relies on before they replace them." },
    ],
  },
  {
    slug: "infrastructure-automation",
    confidential: true,
    title: "Infrastructure Automation & Systems Integration",
    kicker: "Distributed automation, Linux administration and monitoring",
    summary:
      "Developed and support automation workflows that span distributed infrastructure, API integrations, scheduled processing and operational monitoring.",
    context: "Professional",
    org: employer,
    period: "2025 — Present",
    role: "Develop and maintain the automation",
    stack: ["Python", "Bash", "Linux", "SSH", "REST APIs"],
    layers: ["backend", "infra"],
    visual: "spec",
    domains: ["Distributed systems", "Workflow orchestration", "Systems administration", "API integration", "Monitoring", "Reliability"],
    responsibilities: [
      "Develop Python and Bash automation that runs across distributed Linux systems.",
      "Administer those systems: configuration, updates, remote troubleshooting and recovery.",
      "Build monitoring and verification so a failed task is visible instead of silent.",
      "Roll out changes carefully and keep them reversible.",
    ],
    principles: [
      { title: "Exactly-once thinking", body: "In distributed work, duplicate or skipped work is the default failure. Design it out rather than clean it up." },
      { title: "Make failure loud", body: "Health and completion signals turn a silent failure into a visible one." },
      { title: "Verify, then widen", body: "Changes are proven on a small scale before they reach everything." },
    ],
  },
  {
    slug: "data-engineering",
    confidential: true,
    title: "Enterprise Data Engineering & Integration",
    kicker: "Data processing, validation and reconciliation across business systems",
    summary:
      "Developed data-processing and integration workflows that support business systems, data validation, record reconciliation and cross-platform operations.",
    context: "Professional",
    org: employer,
    period: "2025 — Present",
    role: "Built the transformation and validation workflows",
    stack: ["Python", "SQL", "MySQL", "pandas", "REST APIs"],
    layers: ["api", "backend", "data"],
    visual: "spec",
    domains: ["ETL", "Data validation", "Record reconciliation", "SQL analysis", "API synchronization", "Exception reporting"],
    responsibilities: [
      "Write Python and SQL workflows that move and transform records between business platforms.",
      "Map fields between systems that model the same data differently, and preserve source identifiers for traceability.",
      "Detect duplicates and conflicts before anything is written, and report exceptions for review.",
      "Analyze large, multi-million-row datasets with SQL to investigate issues and confirm results.",
    ],
    principles: [
      { title: "Right before fast", body: "Counts, totals and spot checks reconcile source and target before results are trusted." },
      { title: "Exceptions are output", body: "Records that don't fit are reported and reviewed, never silently dropped." },
      { title: "Re-runnable by design", body: "Running a batch twice must not create anything twice." },
    ],
  },
  {
    slug: "cognisense",
    confidential: false,
    title: "CogniSense",
    kicker: "Real-time cognitive load research platform",
    summary:
      "A multimodal research application that estimates mental workload from live EEG, facial expression and NASA-TLX surveys while participants complete controlled tasks.",
    context: "Research",
    org: "Lockheed Martin–sponsored senior design, Gannon University",
    period: "Sep 2024 — May 2025",
    role: "Technical project lead on a student team",
    stack: ["Python", "FastAPI", "WebSockets", "Lab Streaming Layer", "NumPy", "SciPy", "Next.js", "React", "Chart.js", "jsPDF", "Firebase"],
    layers: ["frontend", "api", "backend", "data"],
    visual: "cognisense",
    image: "cognisense",
    problem:
      "Human-factors researchers want to know how demanding a task is while it happens, not only from a questionnaire afterwards. That means putting very different signals on one timeline: a 500 Hz brain-signal stream, video-based emotion estimates and survey answers.",
    approach: [
      "A Python service resolves the EEG headset's Lab Streaming Layer stream (8 channels at 500 Hz), keeps a rolling buffer per channel and, once a full second of data is available, computes beta (13–30 Hz) over alpha (8–12 Hz) band power with Welch's method, averaged across channels.",
      "The service exposes start and stop endpoints and streams the ratio over a WebSocket to a Next.js dashboard, which charts it live against a baseline.",
      "Participants complete gamified tasks (memory, math and categorization levels, with optional audio distractions) and a NASA-TLX survey. A report page combines the EEG score, emotion summary, TLX weighting and task results, and exports to PDF.",
    ],
    features: [
      "Live EEG band-power ratio over WebSockets",
      "Session controls and per-user history",
      "Gamified cognitive tasks with distraction conditions",
      "NASA-TLX weighted workload survey",
      "Facial-expression summary per session",
      "Combined report with PDF export",
    ],
    challenges: [
      { title: "Keeping signals on one clock", body: "EEG samples arrive far faster than UI updates or task events. Buffering per channel and computing on fixed one-second windows gave the dashboard a steady, comparable series." },
      { title: "Hardware in the loop", body: "Most bugs lived between the headset, the streaming layer and the backend. They were found with logs and repeatable test sessions, then written into the setup procedure." },
      { title: "Usable by non-engineers", body: "Researchers run sessions, not code. The dashboard keeps to start, stop and export, and the report explains each score in plain terms." },
      { title: "Working across disciplines", body: "Frontend, hardware and research teammates each owned a piece. My job was making those pieces meet: shared data formats, timing and documented setup." },
    ],
    outcomes: ["Working end-to-end system used in live trials", "Documented setup and test procedures for repeatable sessions"],
    links: [
      { label: "Project site", href: "https://lockheed-cognisense.web.app/" },
      { label: "Dashboard", href: "https://lockheed-cognisense.web.app/dashboard/" },
    ],
  },
  {
    slug: "this-portfolio",
    confidential: false,
    title: "This Portfolio",
    kicker: "A small, carefully engineered frontend",
    summary:
      "The site you're on: a typed, data-driven React application with its own design system, an accessible interactive component, hand-built SVG diagrams and an automated test suite.",
    context: "Independent",
    org: "Personal project",
    period: "2026",
    role: "Design and development",
    stack: ["React 19", "TypeScript", "Vite", "CSS", "React Router", "Playwright", "axe-core", "Python (Pillow)"],
    layers: ["frontend", "infra"],
    visual: "portfolio",
    problem:
      "A portfolio is a frontend project people judge in seconds, on any device. It has to load fast, read clearly, work without a mouse, respect reduced-motion settings, and still be easy for me to update.",
    approach: [
      "Content lives in typed data files, separate from the components that render it, so text, projects and images change without touching layout code.",
      "The design system is a single stylesheet built on CSS custom properties: a fluid type scale, a spacing scale and a small set of components. The 'lane lines' motif comes from competitive swimming.",
      "Diagrams are React components that draw SVG, so they stay sharp at any size and can animate without a charting library. The 'Interface to infrastructure' explorer follows the WAI-ARIA tabs pattern, with arrow-key navigation.",
      "Photos go through a Python pipeline that crops and converts them to responsive WebP. A Playwright suite checks every route, horizontal overflow from 320 px up, links, the mobile menu and axe accessibility rules on desktop and mobile.",
    ],
    features: [
      "Typed content model, separated from components",
      "Design tokens and fluid typography",
      "Accessible tabbed explorer with keyboard support",
      "SVG diagrams and one-time signature animation",
      "Reduced-motion support throughout",
      "Responsive images in WebP",
      "SEO metadata, JSON-LD, sitemap",
      "Playwright + axe test suite",
    ],
    challenges: [
      { title: "Motion that never hides content", body: "Everything is readable with JavaScript or animation off. Reveal effects only add polish on top." },
      { title: "Static hosting, real routes", body: "GitHub Pages has no server routing, so the build ships a 404 fallback that boots the app on the requested path." },
    ],
    outcomes: ["About 110 KB of compressed JavaScript", "Automated checks at six viewport widths"],
    links: [{ label: "Source on GitHub", href: "https://github.com/Hiyanwatanabe/portfolio" }],
  },
  {
    slug: "market-hunter",
    confidential: false,
    title: "Market Hunter",
    kicker: "Algorithmic trading research engine (paper trading only)",
    summary:
      "An independent, evidence-first research engine for testing intraday strategies against historical data and a paper-trading account, built to reject strategies that don't survive honest validation.",
    context: "Independent",
    org: "Personal project",
    period: "2026",
    role: "Sole developer",
    stack: ["Python", "alpaca-py", "Parquet", "pandas", "pytest", "REST APIs"],
    layers: ["api", "backend", "data"],
    visual: "market",
    problem:
      "Most trading backtests look good because they quietly ignore costs, use information that wasn't available yet, or test one idea until it fits. The interesting engineering problem is building a system that makes those mistakes hard.",
    approach: [
      "The engine is built in stages, starting read-only. A preflight verifies the account is a paper account, checks the market clock, buying power, positions and quote freshness, and writes a JSON report.",
      "Historical data is downloaded incrementally to Parquet and validated before research uses it. Strategies such as opening-range breakout, momentum and VWAP pullbacks are tested with slippage and transaction costs modeled.",
      "Safety is enforced in code: the endpoint is fixed to the paper API, live-style keys are refused, non-read requests to unexpected hosts raise before sending, secrets are redacted from logs and engine capital is capped.",
    ],
    features: [
      "Read-only preflight with machine-readable report",
      "Incremental historical data pipeline",
      "Strategy evaluation with costs and slippage",
      "Risk and position limits",
      "Hard guards against live trading",
    ],
    challenges: [
      { title: "Honest evaluation", body: "Most strategies are expected to fail validation, and the engine reports that plainly rather than tuning until something looks good." },
      { title: "Guardrails as code", body: "Safety rules are enforced where requests are made, not in documentation, so a misconfiguration fails loudly before anything is sent." },
    ],
    outcomes: ["Staged engine with tests at each stage", "No performance claims, by design"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
