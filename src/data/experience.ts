export type Experience = {
  org: string;
  role: string; // formal title, as on the resume
  place: string;
  period: string;
  summary: string;
  highlights?: string[];
  capabilities?: { name: string; body: string }[];
  projects?: string[]; // project slugs
  stack: string[];
};

export const experience: Experience[] = [
  {
    org: "National Sales Partners",
    role: "IT Administrator (Software & Automation)",
    place: "Cleveland, OH",
    period: "Oct 2025 — Present",
    summary:
      "Support enterprise IT operations while developing internal applications, automating workflows, integrating business systems and troubleshooting production infrastructure.",
    capabilities: [
      {
        name: "Systems Administration",
        body: "Linux and Windows systems, cloud servers, user access and permissions, backups, change control, and production troubleshooting through logs and root-cause analysis.",
      },
      {
        name: "Full-Stack Development",
        body: "Internal web applications from database to interface: Python and Flask backends, Next.js and React frontends, authentication and role-based access.",
      },
      {
        name: "Automation Engineering",
        body: "Scheduled and event-driven automation, background jobs and integrations that replace repetitive manual work, built to fail safely.",
      },
      {
        name: "Data Engineering",
        body: "SQL queries, joins and views over high-volume data; migration, validation and reconciliation between business platforms; reporting.",
      },
      {
        name: "Enterprise Operations",
        body: "Contact-center and telecom systems, routing and IVR configuration, vendor platforms, and working with operations and finance to turn requirements into working tools.",
      },
    ],
    projects: ["tf4", "communication-systems", "infrastructure-automation", "data-engineering"],
    stack: ["Python", "Flask", "JavaScript", "Next.js", "SQL", "MySQL", "AWS", "Linux", "REST APIs"],
  },
  {
    org: "Lockheed Martin",
    role: "Technical Project Lead · Cognitive Load Research Intern",
    place: "Remote",
    period: "Sep 2024 — May 2025",
    summary:
      "Led the technical build of CogniSense, a Lockheed Martin–sponsored senior-design research system that measures cognitive load from EEG, facial expression and NASA-TLX surveys.",
    highlights: [
      "Built the Python service that reads an 8-channel EEG stream over Lab Streaming Layer and computes a live beta/alpha band-power ratio.",
      "Connected the backend, hardware and a Next.js dashboard; debugged software/hardware timing through logs and repeatable test sessions.",
      "Wrote technical documentation and test procedures, and worked with frontend and hardware teammates to run live trials.",
    ],
    projects: ["cognisense"],
    stack: ["Python", "FastAPI", "WebSockets", "NumPy", "SciPy", "Next.js", "Chart.js", "Firebase"],
  },
  {
    org: "Ankara Informatica",
    role: "Technical Support Intern",
    place: "São Paulo, Brazil",
    period: "Jun 2023 — Aug 2023",
    summary: "First professional IT role: support across Windows and Linux environments.",
    highlights: [
      "Supported desktops, mobile devices and printers; imaged systems, installed software and maintained workstations.",
      "Documented issues and resolutions and helped onboard and train users.",
    ],
    stack: ["Windows", "Linux", "Imaging", "Endpoint support"],
  },
];
