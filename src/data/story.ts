// "Beyond the Code": Hiyan's own words (Nov 2026), shown on /about/.
export const story = {
  title: "Beyond the code",
  intro: "Hi, I'm Hiyan Kubagawa.",
  sections: [
    {
      id: "background",
      heading: "From São Paulo to the pool to computer science",
      paragraphs: [
        "I'm a Full-Stack Software Engineer and Systems Administrator with a background that brings together competitive athletics, computer science, software development and enterprise technology.",
        "Originally from São Paulo, Brazil, and of Japanese descent, I moved to the United States to pursue my education and collegiate swimming career. That experience shaped much more than my academic and professional development. It taught me how to adapt to unfamiliar environments, pursue ambitious goals, and stay disciplined when facing challenges.",
        "I graduated Cum Laude from Gannon University in May 2025 with a Bachelor of Science in Computer Science while competing as an NCAA Division II swimmer. During my collegiate career I earned academic-athletic recognition and contributed to two school swimming records.",
        "Balancing academics, competitive athletics and technical projects taught me the importance of preparation, consistency and continuous improvement. Those are principles I still apply to my work today.",
      ],
    },
    {
      id: "engineering",
      heading: "From computer science to real-world engineering",
      paragraphs: [
        "My interest in technology goes beyond writing code. I've always wanted to understand how things work, how different systems communicate, why problems happen, and how technology can be used to solve them.",
        "My education gave me a foundation in software engineering, programming, algorithms, databases, networking, operating systems and computer architecture. Over time my interests expanded into full-stack web development, backend services, automation, cloud infrastructure and systems engineering.",
        "What excites me most is connecting these areas. I enjoy building a clean, functional user interface just as much as designing the backend logic that powers it. I enjoy working with APIs, building data-processing tools, configuring infrastructure, and investigating technical issues that require looking beyond a single application.",
        "To me, engineering isn't just about creating something that works. It's about understanding why it works, how its components interact, how it behaves when things go wrong, and how to make it more dependable.",
      ],
    },
    {
      id: "work",
      heading: "Engineering in a professional environment",
      paragraphs: [
        "Today I work at National Sales Partners, where my role combines systems administration, software development, technical operations and infrastructure support. Working in a production environment has given me a deeper appreciation for the relationship between software and the systems that support it.",
        "My work involves supporting enterprise applications, developing internal tools, integrating APIs, automating operational processes, working with databases, and troubleshooting interconnected technical systems, with Python, JavaScript, React, SQL, AWS, Linux and a range of enterprise platforms.",
        "One of the most rewarding parts of the job is translating complicated operational requirements into practical technical solutions. Sometimes that means building an application or improving an interface. Other times it means investigating an integration problem, building an automation workflow, analyzing data, or finding the source of an issue in a production system. Each challenge needs a different approach, but the goal stays the same: solutions that are reliable, maintainable and genuinely useful.",
        "This has given me a broader engineering perspective. I don't see frontend, backend services, databases and infrastructure as isolated specialties. I see them as connected parts of a larger system.",
      ],
      links: [
        { label: "TF4 case study", to: "/work/tf4/" },
        { label: "Auto-Invoice case study", to: "/work/auto-invoice/" },
      ],
    },
    {
      id: "research",
      heading: "Research, collaboration and technical curiosity",
      paragraphs: [
        "Before joining National Sales Partners, I worked on CogniSense, a cognitive-load research project developed in connection with Lockheed Martin. As Technical Project Lead and Cognitive Load Research Intern, I helped build a system that combined physiological sensor data, software processing and real-time visualization to support research into mental workload.",
        "The project meant integrating hardware and software, developing data workflows, troubleshooting technical issues and collaborating across engineering disciplines. It was a problem beyond conventional web development: understanding how software interacts with physical systems and real-time data. It strengthened my interest in complex technical challenges and reinforced the importance of communication, testing and careful engineering.",
      ],
      links: [{ label: "CogniSense case study", to: "/work/cognisense/" }],
    },
    {
      id: "building",
      heading: "Building beyond my job",
      paragraphs: [
        "Outside work, I experiment with technologies, explore new engineering concepts and build independent applications. My interests include full-stack development, algorithmic systems, automation, data analysis, interactive dashboards, and applications that connect different services or devices.",
        "I like projects that make me learn something unfamiliar. Whether I'm exploring a new framework, testing an algorithm, designing an interface or working through a hard problem, I enjoy taking an idea and turning it into something that works. Personal projects are where I experiment with ideas I might not meet in my day-to-day work.",
      ],
      links: [
        { label: "Market Hunter", to: "/work/market-hunter/" },
        { label: "This portfolio", to: "/work/this-portfolio/" },
      ],
    },
    {
      id: "mindset",
      heading: "The mindset behind my work",
      paragraphs: [
        "Competitive swimming shaped who I am. Training and competing at the collegiate level taught me that meaningful progress rarely comes from one exceptional performance. It comes from preparation, consistency, learning from mistakes, and showing up ready to improve. I approach engineering the same way.",
        "I value attention to detail, persistence, continuous learning, and the willingness to investigate a problem until I understand it. Strong engineering also takes collaboration: explaining technical ideas clearly, understanding different perspectives, and working with people across teams matter as much as writing good code.",
        "My international background reinforces that. Growing up in Brazil, studying and working in the United States, and communicating in Portuguese, English and Spanish have given me experience adapting to different environments and working with different people.",
      ],
    },
    {
      id: "next",
      heading: "What's next",
      paragraphs: [
        "I'm continuing to grow as an engineer, with a particular interest in full-stack software development, backend systems, cloud infrastructure and automation. I want to keep working on challenging problems, deepen my technical range, and contribute to software and systems that people can depend on.",
        "I'm especially interested in roles where I can combine software development with a deeper understanding of infrastructure, integration and real-world operations. I don't want to be limited to knowing how to use a technology. I want to understand how it works, how it fits into a larger system, and how to make it better.",
      ],
    },
  ],
  signoff: "I'm Hiyan Kubagawa. I build software, work with systems, and enjoy solving the difficult problems that connect them.",

  // Short, factual answers that condense what the rest of the site shows.
  facts: [
    {
      q: "Who is Hiyan Kubagawa?",
      a: "Hiyan Kubagawa is a full-stack software engineer and systems administrator based in Cleveland, Ohio, who builds web applications, integrations and business automation with Python, TypeScript, React, Next.js, SQL, AWS and Linux.",
    },
    {
      q: "What does Hiyan work on?",
      a: "Production systems at National Sales Partners, including TF4, a toll-free inventory automation platform, and Auto-Invoice, a rules-driven invoicing platform, plus infrastructure automation, data integration and contact-center modernization.",
    },
    {
      q: "What sets the work apart?",
      a: "It spans both the application and the infrastructure: Hiyan designs, builds and operates the interface, the APIs and data behind it, and the Linux and AWS servers it runs on.",
    },
    {
      q: "Education and credentials?",
      a: "B.S. in Computer Science, Cum Laude, Gannon University (May 2025); AWS Certified Cloud Practitioner (2025); Google Data Analytics Professional Certificate (2025). Former NCAA Division II swimmer.",
    },
    {
      q: "Languages?",
      a: "Portuguese (native), English (fluent, professional) and Spanish (full professional).",
    },
  ],
} as const;
