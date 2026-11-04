import type { Layer } from "./projects";

// Three honest tiers instead of percentages:
//   production:  used at work, in systems people depend on
//   projects:    hands-on in projects, research or labs
//   foundations: studied, coursework, or occasional use
export type SkillGroup = {
  title: string;
  production: string[];
  projects: string[];
  foundations: string[];
  evidence: string[]; // project slugs that demonstrate this group
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    production: ["Python", "SQL", "JavaScript", "Bash"],
    projects: ["TypeScript", "HTML / CSS", "C#"],
    foundations: ["C", "C++", "Java", "Kotlin"],
    evidence: ["tf4", "this-portfolio", "cognisense"],
  },
  {
    title: "Frontend",
    production: ["React", "Next.js", "Dashboards & internal tools"],
    projects: ["TypeScript + React", "Vite", "Chart.js", "Responsive & accessible UI", "SVG"],
    foundations: ["Tailwind CSS"],
    evidence: ["this-portfolio", "cognisense", "communication-systems"],
  },
  {
    title: "Backend & APIs",
    production: ["Flask", "Node.js", "REST API integration", "Authentication & RBAC", "Background jobs"],
    projects: ["FastAPI", "WebSockets", "OAuth 2.0"],
    foundations: [".NET"],
    evidence: ["tf4", "cognisense", "market-hunter"],
  },
  {
    title: "Data",
    production: ["MySQL", "SQLite", "SQLAlchemy", "ETL & reconciliation", "Reporting"],
    projects: ["pandas", "NumPy", "SciPy", "Parquet", "Firebase"],
    foundations: ["Tableau", "Power BI", "SSRS"],
    evidence: ["data-engineering", "cognisense", "market-hunter"],
  },
  {
    title: "Cloud & Infrastructure",
    production: ["AWS EC2", "AWS Lambda", "API Gateway", "DynamoDB", "RDS", "Nginx", "Git"],
    projects: ["Vercel", "GitHub Pages", "Docker"],
    foundations: ["S3", "IAM", "VPC", "CloudWatch", "CI/CD"],
    evidence: ["tf4", "infrastructure-automation", "communication-systems"],
  },
  {
    title: "Systems Administration",
    production: ["Linux", "Windows administration", "SSH & remote management", "User & access management", "Backups & recovery", "Change control", "Troubleshooting & RCA"],
    projects: ["Active Directory", "Group Policy", "Windows Server", "Proxmox / Ceph"],
    foundations: ["RMM tools", "Endpoint security"],
    evidence: ["infrastructure-automation", "tf4"],
  },
  {
    title: "Telecom & Contact Center",
    production: ["Call routing & IVR", "DNIS", "Queues", "Contact-center platforms (NICE, Mitel)", "Telecom number management", "Call reporting"],
    projects: [],
    foundations: [],
    evidence: ["communication-systems", "tf4"],
  },
];

// "Interface to infrastructure" explorer: one entry per layer of a typical application.
// This is a general picture of the stack I work across, not a diagram of any employer system.
export const layers: { id: Layer; name: string; short: string; body: string; tools: string[] }[] = [
  {
    id: "frontend",
    name: "Frontend",
    short: "What people see",
    body: "Interfaces people use every day: internal dashboards, operational tools and this site. Typed components, responsive layouts and keyboard-accessible interactions.",
    tools: ["React", "Next.js", "TypeScript", "JavaScript", "HTML / CSS", "Chart.js"],
  },
  {
    id: "api",
    name: "APIs",
    short: "How systems talk",
    body: "REST endpoints, WebSockets and third-party integrations, with authentication, validation and error handling designed in from the start.",
    tools: ["REST", "WebSockets", "OAuth 2.0", "JSON", "Auth & RBAC"],
  },
  {
    id: "backend",
    name: "Backend",
    short: "Where the logic lives",
    body: "Application services and business logic in Python and Node.js, plus background jobs and automation that run on their own and leave a record.",
    tools: ["Python", "Flask", "FastAPI", "Node.js", "Background jobs", "pytest"],
  },
  {
    id: "data",
    name: "Data",
    short: "What has to be right",
    body: "Relational modeling, SQL analysis, migrations, validation and reconciliation, so the numbers people act on are the right ones.",
    tools: ["SQL", "MySQL", "SQLite", "SQLAlchemy", "pandas", "DynamoDB"],
  },
  {
    id: "infra",
    name: "Infrastructure",
    short: "What keeps it running",
    body: "Cloud services, Linux and Windows administration, deployment, monitoring and recovery. The part that decides whether everything above it stays up.",
    tools: ["AWS", "Linux", "Windows", "Nginx", "SSH", "Git"],
  },
];
