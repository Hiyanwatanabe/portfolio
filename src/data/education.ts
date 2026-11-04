// Degree details are verified against the diploma (conferred May 10, 2025, Cum Laude).
export const education = {
  school: "Gannon University",
  place: "Erie, Pennsylvania",
  degree: "Bachelor of Science in Computer Science",
  distinction: "Cum Laude",
  graduated: "May 2025",
  gpa: "3.52",
  honors: ["Dean's List"],
  coursework: ["Data structures & algorithms", "Operating systems", "Computer architecture", "Networking", "Databases", "Distributed programming"],
};

export const certifications = [
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Aug 2025", note: "Valid through Aug 2028" },
  { name: "Google Data Analytics Professional Certificate", issuer: "Google", date: "May 2025" },
];

export const athletics = {
  program: "Gannon University Swimming & Diving",
  level: "NCAA Division II · PSAC",
  records: [
    { event: "200 Individual Medley", note: "School record" },
    { event: "100 Breaststroke", note: "School record" },
  ],
  honors: ["Multiple Scholar-Athlete awards", "PSAC academic honors"],
};

// The journey, told as race splits.
export const splits = [
  { mark: "São Paulo", time: "Until 2020", title: "Two disciplines", body: "Grew up in São Paulo, finished high school in 2020, and trained as a competitive swimmer." },
  { mark: "Erie, PA", time: "Undergrad", title: "Computer Science, Division II", body: "Moved to the U.S. for Gannon University; studied CS while racing for the swim team and set two school records." },
  { mark: "São Paulo", time: "Summer 2023", title: "First IT role", body: "Technical support internship at Ankara Informatica across Windows and Linux." },
  { mark: "Research", time: "2024 — 2025", title: "CogniSense", body: "Led the technical build of a Lockheed Martin–sponsored cognitive-load research system." },
  { mark: "Graduation", time: "May 2025", title: "B.S. Computer Science, Cum Laude", body: "Graduated with a 3.52 GPA; Google Data Analytics certificate, then AWS Cloud Practitioner that August." },
  { mark: "Cleveland, OH", time: "Oct 2025 →", title: "Production systems", body: "Systems administration and full-stack development in a live business operation." },
];
