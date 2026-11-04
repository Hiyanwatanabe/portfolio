// Per-page metadata. Used in the browser (useMeta) and at build time (scripts/prerender.mjs),
// so the HTML each URL serves already carries its own title, description, canonical and share card.
import { projects } from "./data/projects";
import { profile } from "./data/profile";
import { education } from "./data/education";

export type Meta = {
  path: string; // relative to the site root, "" for home, always ending in "/" otherwise
  title: string;
  description: string;
  image: string; // relative to the site root
  type: "profile" | "article" | "website";
  noindex?: boolean;
};

const site = __SITE_URL__;
const name = profile.name;
const UPDATED = "2026-11-04"; // case studies: last substantive update

export const routes = ["/", "/about/", ...projects.map((p) => `/work/${p.slug}/`)];

export function metaFor(pathname: string): Meta {
  const path = pathname.replace(/^\//, "").replace(/([^/])$/, "$1/");
  if (path === "" || path === "/") {
    return {
      path: "",
      title: `${name} | Full-Stack Software Engineer & Systems Administrator`,
      description:
        "Cleveland-based full-stack engineer and systems administrator building web applications, integrations and automation with Python, React, SQL, AWS and Linux. Explore production case studies.",
      image: "og.png",
      type: "profile",
    };
  }
  if (path === "about/") {
    return {
      path,
      title: `About ${name} | From São Paulo and the Pool to Production Systems`,
      description:
        "Hiyan Kubagawa's story: a Brazilian-born NCAA Division II swimmer and Cum Laude computer science graduate who now builds and runs production systems in Cleveland, Ohio.",
      image: "og.png",
      type: "profile",
    };
  }
  const slug = path.match(/^work\/([^/]+)\/$/)?.[1];
  const p = projects.find((x) => x.slug === slug);
  if (p) {
    return {
      path,
      title: `${p.seoTitle ?? `${p.title}: ${p.kicker}`} | ${name}`,
      description: p.seoDescription ?? p.summary,
      image: `og/${p.slug}.png`,
      type: "article",
    };
  }
  return { path, title: `Page not found | ${name}`, description: "This page does not exist.", image: "og.png", type: "website", noindex: true };
}

const person = {
  "@type": "Person",
  "@id": `${site}#person`,
  name,
  alternateName: profile.fullName,
  url: site,
  image: `${site}og.png`,
  jobTitle: "IT Administrator (Software & Automation)",
  description: "Full-stack software engineer and systems administrator",
  email: `mailto:${profile.email}`,
  worksFor: { "@type": "Organization", name: "National Sales Partners" },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  address: { "@type": "PostalAddress", addressLocality: "Cleveland", addressRegion: "OH", addressCountry: "US" },
  knowsLanguage: ["pt", "en", "es"],
  knowsAbout: ["Full-stack development", "Systems administration", "Automation", "Python", "TypeScript", "React", "Next.js", "SQL", "AWS", "Linux"],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "AWS Certified Cloud Practitioner", recognizedBy: { "@type": "Organization", name: "Amazon Web Services" } },
    { "@type": "EducationalOccupationalCredential", name: "Google Data Analytics Professional Certificate", recognizedBy: { "@type": "Organization", name: "Google" } },
  ],
  sameAs: [profile.github, profile.linkedin],
};

/** Structured data for a page. Only describes what the page visibly shows. */
export function jsonLdFor(pathname: string): object | null {
  const m = metaFor(pathname);
  if (m.noindex) return null;
  if (m.path === "") return { "@context": "https://schema.org", ...person };
  if (m.path === "about/") {
    return {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url: `${site}about/`,
      name: m.title,
      dateModified: UPDATED,
      mainEntity: person,
    };
  }
  const slug = m.path.split("/")[1];
  const p = projects.find((x) => x.slug === slug)!;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: p.seoTitle ?? `${p.title}: ${p.kicker}`,
    description: m.description,
    url: `${site}${m.path}`,
    mainEntityOfPage: `${site}${m.path}`,
    image: `${site}${m.image}`,
    dateModified: UPDATED,
    author: { "@type": "Person", "@id": `${site}#person`, name, url: site },
    about: p.stack.slice(0, 6),
  };
}

export const caseStudyUpdated = "November 2026";
