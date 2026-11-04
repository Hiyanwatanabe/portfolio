// Personal facts and site-wide copy.
// Sources: resumes (2025–2026), Gannon University diploma, contact details supplied by Hiyan (Nov 2026).
export const profile = {
  name: "Hiyan Kubagawa",
  fullName: "Hiyan Otavio Watanabe Kubagawa",
  // Public brand. The formal job title stays in the experience timeline.
  roles: ["Full-Stack Software Engineer", "Systems Administrator"],
  specialties: ["Full-Stack Development", "Cloud & Infrastructure", "Systems Automation", "Data Engineering"],
  location: "Cleveland, Ohio",
  origin: "São Paulo, Brazil",
  email: "hiyanwk@gmail.com",
  phone: "+1 (814) 218-6777",
  phoneHref: "tel:+18142186777",
  github: "https://github.com/Hiyanwatanabe",
  linkedin: "https://www.linkedin.com/in/hiyan-kubagawa-/",
  // Put the PDF in /public under this name. See README → "Replace the resume".
  resume: "Hiyan_Kubagawa_Resume.pdf",
  siteUrl: "https://hiyanwatanabe.github.io/portfolio/",

  headline: "I build the software and systems behind real-world operations.",
  lede:
    "Full-stack applications, the APIs and data that connect them, and the servers and cloud they run on. I write the code, administer the systems, and automate the work in between, so the whole thing stays reliable.",

  credentials: [
    { label: "Now", value: "IT Administrator (Software & Automation), National Sales Partners" },
    { label: "Degree", value: "B.S. Computer Science, Cum Laude, Gannon University" },
    { label: "Cloud", value: "AWS Certified Cloud Practitioner" },
    { label: "Athletics", value: "NCAA Division II swimmer, two school records" },
  ],

  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Fluent, professional" },
    { name: "Spanish", level: "Full professional" },
  ],
} as const;

export const about = {
  title: "Engineering, at the pace of real operations",
  paragraphs: [
    "I grew up in São Paulo, a Brazilian of Japanese descent, and came to the United States to study Computer Science at Gannon University while swimming for its NCAA Division II team. Training twice a day next to a full course load teaches you to plan your week in splits and to trust repetition over inspiration.",
    "What draws me to engineering is the moment a system starts behaving predictably. In my senior year that meant getting an EEG headset, a Python signal pipeline and a web dashboard to agree on time. Today it means building the application people work in every day, and keeping the servers, integrations and data underneath it healthy.",
    "I like working on both sides of that line. A good interface is worth little if the system behind it is fragile, and a solid system is wasted if nobody can use it.",
  ],
  quote: {
    text: "Swimming is more than just winning competitions; it's about the journey of discipline, resiliency, and victories shared with my team.",
    source: "Gannon University Day of Giving, 2024",
  },
} as const;

export const contact = {
  title: "Let's solve something difficult.",
  body: "I build applications, connect systems and solve the technical problems that matter to the people using them. From the interface to the infrastructure behind it, I bring a practical engineering mindset, and I'd like to hear what you're working on.",
} as const;
