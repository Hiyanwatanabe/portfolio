// Personal facts and site-wide copy.
// Sources: resumes (2025–2026), Gannon University diploma, contact details supplied by Hiyan (Nov 2026).
export const profile = {
  name: "Hiyan Kubagawa",
  fullName: "Hiyan Otavio Watanabe Kubagawa",
  // Public brand. The formal job title stays in the experience timeline.
  roles: ["Full-Stack Software Engineer", "Systems Administrator"],
  specialties: ["Full-Stack Development", "Cloud & Infrastructure", "Systems Automation", "Data Engineering", "Product & Go-to-Market"],
  location: "Cleveland, Ohio",
  origin: "São Paulo, Brazil",
  email: "hiyanwk@gmail.com",
  phone: "+1 (814) 218-6777",
  phoneHref: "tel:+18142186777",
  github: "https://github.com/Hiyanwatanabe",
  linkedin: "https://www.linkedin.com/in/hiyan-kubagawa-/",
  // Put the PDF in /public under this name. See README → "Replace the resume".
  resume: "Hiyan_Kubagawa_Resume.pdf",
  siteUrl: __SITE_URL__, // from site.config.json

  headline: "I design, build and operate web applications, APIs and business automation.",
  lede:
    "From React and Next.js interfaces to Python, SQL, AWS and Linux infrastructure. I'm currently building and supporting production systems at National Sales Partners in Cleveland, Ohio.",

  // Three quick proofs right under the intro, each pointing at the evidence.
  proofs: [
    {
      label: "Production engineering",
      title: "Systems a business runs on",
      body: "Applications and automation in live business use, which I build, deploy and support.",
      href: "#work",
      cta: "See the case studies",
    },
    {
      label: "End-to-end ownership",
      title: "Interface to infrastructure",
      body: "Frontend, APIs, databases, deployment, and the Linux and AWS servers underneath.",
      href: "#stack",
      cta: "Explore the layers",
    },
    {
      label: "Education & credentials",
      title: "B.S. CS, Cum Laude",
      body: "Gannon University, 2025 · AWS Certified Cloud Practitioner · Google Data Analytics.",
      href: "#education",
      cta: "Verify credentials",
    },
  ],

  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Fluent, professional" },
    { name: "Spanish", level: "Full professional" },
  ],
} as const;

export const about = {
  title: "Beyond the code",
  // Short version for the home page; the full story lives on /about/.
  paragraphs: [
    "I'm from São Paulo, Brazil, of Japanese descent, and came to the United States to study Computer Science at Gannon University while swimming for its NCAA Division II team. I graduated Cum Laude in May 2025. Balancing training, coursework and technical projects taught me preparation, consistency and continuous improvement, and I still work that way.",
    "I've always wanted to understand how things work: how systems communicate, why problems happen, and how to fix them for good. I enjoy building a clean, functional interface just as much as the backend logic and infrastructure behind it.",
    "To me, engineering isn't just making something work. It's understanding why it works, how its parts interact, how it behaves when things go wrong, and how to make it more dependable.",
  ],
  quote: {
    text: "Swimming is more than just winning competitions; it's about the journey of discipline, resiliency, and victories shared with my team.",
    source: "Gannon University Day of Giving, 2024",
  },
} as const;

export const contact = {
  title: "Let's solve something difficult.",
  body: "Interested in full-stack development, systems automation or infrastructure engineering? I'd be glad to talk about how I can contribute. The fastest way to reach me is email or LinkedIn.",
} as const;
