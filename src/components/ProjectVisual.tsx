import type { Project } from "../data/projects";
import { visuals } from "../visuals";
import { SpecVisual } from "../visuals/SpecVisual";
import dash from "../assets/img/cognisense-dashboard-947.webp";
import report from "../assets/img/cognisense-report-850.webp";

/** Card preview: a real screenshot for public projects that have one, a domain map for confidential work. */
export function ProjectPreview({ project }: { project: Project }) {
  if (project.confidential) {
    return <SpecVisual title={project.title} domains={project.domains} stack={project.stack} />;
  }
  if (project.image === "cognisense") {
    return (
      <div className="shot shot-stack">
        <img src={dash} alt="CogniSense EEG dashboard with a live beta/alpha ratio chart" width={947} height={686} loading="lazy" decoding="async" />
        <img className="back" src={report} alt="CogniSense session report combining EEG, emotion, NASA-TLX and task scores" width={850} height={390} loading="lazy" decoding="async" />
      </div>
    );
  }
  return <ProjectDiagram project={project} />;
}

/** The technical diagram for a public project. */
export function ProjectDiagram({ project }: { project: Project }) {
  if (project.confidential || project.visual === "spec") return null;
  const Visual = visuals[project.visual];
  return <Visual />;
}

export const cognisenseShots = [
  { src: dash, w: 947, h: 686, alt: "CogniSense EEG dashboard", caption: "Live dashboard: session controls, the current cognitive-load value and the real-time β/α chart." },
  { src: report, w: 850, h: 390, alt: "CogniSense session report", caption: "Session report: combined EEG and emotion score, NASA-TLX breakdown and task results." },
];
