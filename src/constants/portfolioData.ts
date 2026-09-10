import { Project, SkillItem, TimelineMilestone } from '../types';

export const PERSONAL_INFO = {
  name: "Himarghya Das",
  roleTitle: "Full Stack Developer & C++ Systems Engineer",
  roles: [
    "Full Stack Developer",
    "C++ Programmer",
    "AI/ML Enthusiast",
    "Problem Solver",
    "Creative Technologist"
  ],
  status: "AVAILABLE FOR OPPORTUNITIES",
  location: "India // Remote Available",
  bio: "I'm a developer passionate about turning complex problems into elegant digital solutions. I enjoy building full-stack applications, exploring AI/ML, solving algorithmic challenges, and experimenting with emerging technologies.",
  stats: [
    { label: "Major Projects", value: "4+", detail: "Production & Research Scale" },
    { label: "Core Competency", value: "Full Stack", detail: "React, Node, FastAPI" },
    { label: "Algorithmic Focus", value: "C++ / DSA", detail: "High Performance & Logic" },
    { label: "Exploration", value: "AI / ML", detail: "Deep Learning & Vision" }
  ],
  links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "himarghyadas.dev@example.com",
  },
  mission: "Build intelligent systems that solve real-world problems with scalable architecture and immersive experiences."
};

export const PROJECTS: Project[] = [
  {
    id: "varshanet",
    number: "01",
    title: "VARSHANET 2.0",
    subtitle: "Weather Big Data Analytics & Geospatial Intelligence",
    description: "A real-time weather big data analytics platform designed for multi-modal weather verification, disaster intelligence, and geospatial insights. Features high-velocity satellite & ground telemetry ingestion, predictive rain mapping, and interactive GIS spatial queries.",
    highlights: [
      "Multi-modal sensor fusion and real-time precipitation radar mapping",
      "Geospatial query optimization using PostGIS & spatial indexing",
      "Predictive disaster risk classification powered by AI/ML pipelines"
    ],
    techStack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "PostGIS", "AI/ML", "GIS"],
    category: "Data / AI",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com/varshanet",
    caseStudyAvailable: true,
    color: "from-cyan-500/20 via-blue-600/10 to-transparent",
    accentHex: "#00E5FF",
    type3D: "weather-globe"
  },
  {
    id: "ocean-intelligence",
    number: "02",
    title: "OCEAN INTELLIGENCE",
    subtitle: "Marine Observation & Environmental Telemetry Platform",
    description: "An ocean monitoring and analytics platform for exploring marine observations, anomalies, and intelligent environmental insights. Processes bathymetric, salinity, and temperature telemetry across maritime sensor nodes.",
    highlights: [
      "3D spatial ocean thermal anomaly detection & historical trend analysis",
      "Containerized microservices architecture with automated telemetry pipelines",
      "Real-time sensor telemetry dashboard with low-latency streaming"
    ],
    techStack: ["React", "FastAPI", "PostgreSQL", "Docker", "Data Analytics"],
    category: "Full Stack",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com/ocean-intelligence",
    caseStudyAvailable: true,
    color: "from-blue-500/20 via-indigo-600/10 to-transparent",
    accentHex: "#38BDF8",
    type3D: "ocean-sphere"
  },
  {
    id: "hospital-management",
    number: "03",
    title: "HOSPITAL MANAGEMENT SYSTEM",
    subtitle: "Clinical Workflow & Telemetry Management Portal",
    description: "A full-stack hospital management application designed to streamline patient, doctor, and administrative workflows with role-based access control, prescription tracking, and appointment scheduling.",
    highlights: [
      "End-to-end relational schema modeling with strict audit compliance",
      "Intuitive doctor-patient telemetry interface and electronic health records",
      "Scalable REST API endpoints built with Express.js and resilient pooling"
    ],
    techStack: ["React", "Express.js", "PostgreSQL", "JavaScript", "Tailwind CSS"],
    category: "Web Systems",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com/hospital-system",
    caseStudyAvailable: true,
    color: "from-emerald-500/20 via-teal-600/10 to-transparent",
    accentHex: "#10B981",
    type3D: "medical-hud"
  },
  {
    id: "the-card-catalog",
    number: "04",
    title: "THE CARD CATALOG",
    subtitle: "Interactive Digital Archive & Book Discovery Engine",
    description: "A visually immersive digital book discovery platform featuring a vintage card-inspired interface, dynamic REST API integrations, and rich catalog search algorithms.",
    highlights: [
      "Tactile 3D rotating card deck UI with interactive inspection physics",
      "Seamless book metadata aggregation through Open Library & Google Books APIs",
      "Server-rendered dynamic views with PostgreSQL indexing and caching"
    ],
    techStack: ["Express.js", "EJS", "PostgreSQL", "Bootstrap", "APIs", "Three.js"],
    category: "Interactive",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com/card-catalog",
    caseStudyAvailable: true,
    color: "from-amber-500/20 via-purple-600/10 to-transparent",
    accentHex: "#F59E0B",
    type3D: "card-deck"
  }
];

export const SKILL_CATEGORIES: {
  category: SkillItem['category'];
  description: string;
  skills: SkillItem[];
}[] = [
  {
    category: "Programming",
    description: "High performance system level languages and algorithmic foundations",
    skills: [
      { name: "C++", category: "Programming", levelText: "Core Systems & Algorithms", iconName: "Code2", color: "#00E5FF", description: "OOP, STL, pointers, memory optimization, competitive problem solving", tags: ["C++17/20", "STL", "Memory Mgmt"] },
      { name: "Data Structures & Algorithms", category: "Programming", levelText: "Advanced Problem Solving", iconName: "Binary", color: "#A3FF12", description: "Trees, Graphs, DP, Greedy, Time & Space Complexity Optimization", tags: ["Graph Theory", "DP", "Trees"] },
      { name: "Python", category: "Programming", levelText: "Scripting & Intelligence", iconName: "Terminal", color: "#38BDF8", description: "Data manipulation, automation, AI pipelines, API microservices", tags: ["Python3", "NumPy", "Pandas"] },
      { name: "JavaScript / TypeScript", category: "Programming", levelText: "Type-Safe Modern Web", iconName: "FileCode2", color: "#FBBF24", description: "ES6+, Async/Await, Generics, strict typing, DOM, Event Loops", tags: ["TypeScript", "ESNext", "Async"] }
    ]
  },
  {
    category: "Frontend",
    description: "Responsive, high-fidelity user interfaces and 3D visual experiences",
    skills: [
      { name: "React", category: "Frontend", levelText: "Component Architecture", iconName: "Layers", color: "#00E5FF", description: "Hooks, Context API, state machines, custom hooks, performance tuning", tags: ["React 18", "Hooks", "Virtual DOM"] },
      { name: "TypeScript", category: "Frontend", levelText: "Scalable Type Systems", iconName: "ShieldCheck", color: "#3B82F6", description: "Interface contracts, utility types, strict compilation, clean abstractions", tags: ["Types", "Interfaces", "Strict"] },
      { name: "Tailwind CSS", category: "Frontend", levelText: "Modern Utility Styling", iconName: "Palette", color: "#06B6D4", description: "Custom design systems, glassmorphism, responsive grids, dark mode", tags: ["Design Systems", "JIT", "Animations"] },
      { name: "HTML & CSS", category: "Frontend", levelText: "Semantic & Responsive Web", iconName: "Layout", color: "#F97316", description: "Semantic HTML5, CSS Grid, Flexbox, Canvas, View Transitions, a11y", tags: ["HTML5", "CSS3", "Grid/Flex"] }
    ]
  },
  {
    category: "Backend",
    description: "Robust server architectures, RESTful APIs, and event-driven backends",
    skills: [
      { name: "Node.js", category: "Backend", levelText: "Asynchronous Runtime", iconName: "Server", color: "#22C55E", description: "Non-blocking I/O, Event loop, Streams, Modules, npm ecosystem", tags: ["Runtime", "Async I/O", "Microservices"] },
      { name: "Express.js", category: "Backend", levelText: "Fast Web APIs", iconName: "Cpu", color: "#94A3B8", description: "Middleware chains, routing, authentication, error handlers, REST APIs", tags: ["Middleware", "Routing", "REST"] },
      { name: "FastAPI", category: "Backend", levelText: "High Speed Python APIs", iconName: "Zap", color: "#10B981", description: "Pydantic validation, async/await coroutines, OpenAPI specs, speed", tags: ["Pydantic", "Async", "OpenAPI"] },
      { name: "REST APIs", category: "Backend", levelText: "API Design & Integration", iconName: "Network", color: "#7C3AED", description: "Clean endpoint design, rate limiting, token auth, caching strategies", tags: ["HTTP", "JSON", "Security"] }
    ]
  },
  {
    category: "Database",
    description: "Relational modeling, indexing, and spatial data persistence",
    skills: [
      { name: "PostgreSQL", category: "Database", levelText: "Relational Heavyweight", iconName: "Database", color: "#3B82F6", description: "Complex joins, indexing, ACID transactions, materialized views", tags: ["RDBMS", "ACID", "Indexes"] },
      { name: "SQL", category: "Database", levelText: "Query Optimization", iconName: "Table", color: "#A855F7", description: "Schema normalization, CTEs, aggregation pipelines, subqueries", tags: ["Relational", "Queries", "Joins"] }
    ]
  },
  {
    category: "AI / ML",
    description: "Predictive modeling, data analytics, and computational perception",
    skills: [
      { name: "Machine Learning", category: "AI / ML", levelText: "Predictive Modeling", iconName: "Brain", color: "#EC4899", description: "Regression, classification, feature engineering, model evaluation", tags: ["Scikit-Learn", "Model Training"] },
      { name: "Computer Vision", category: "AI / ML", levelText: "Visual Data Processing", iconName: "Eye", color: "#8B5CF6", description: "Image filtering, feature detection, object tracking, spatial analysis", tags: ["Image Processing", "Perception"] },
      { name: "Data Analytics", category: "AI / ML", levelText: "Insights & Visualization", iconName: "BarChart3", color: "#00E5FF", description: "Data exploration, statistical distributions, telemetry aggregation", tags: ["Insights", "Telemetry", "Plots"] }
    ]
  },
  {
    category: "Tools",
    description: "DevOps, version control, and development environments",
    skills: [
      { name: "Git & GitHub", category: "Tools", levelText: "Distributed Versioning", iconName: "GitBranch", color: "#F43F5E", description: "Branching strategies, merge conflict resolution, CI workflows, PRs", tags: ["VCS", "Collaboration", "CI"] },
      { name: "Docker", category: "Tools", levelText: "Containerization", iconName: "Box", color: "#0284C7", description: "Dockerfiles, multi-stage builds, container isolation, compose", tags: ["Containers", "Isolation"] },
      { name: "VS Code", category: "Tools", levelText: "Modern IDE Mastery", iconName: "Wrench", color: "#3B82F6", description: "Debuggers, extensions, terminal integration, linter workflows", tags: ["IDE", "Productivity"] }
    ]
  }
];

export const TIMELINE: TimelineMilestone[] = [
  {
    id: "m1",
    year: "PHASE 01",
    status: "COMPLETED",
    title: "The Genesis: Programming & Problem Solving",
    description: "Commenced deep-dive into C++, object-oriented principles, and algorithmic problem solving. Mastered data structures, time-complexity analysis, and foundational computing architecture.",
    skills: ["C++", "Data Structures", "Algorithms", "STL", "Problem Solving"],
    icon: "Terminal",
    badge: "Foundational Mastery"
  },
  {
    id: "m2",
    year: "PHASE 02",
    status: "COMPLETED",
    title: "Full-Stack Web Engineering",
    description: "Expanded into modern web systems architecture. Engineered responsive frontends with React and built REST APIs with Node.js, Express, and PostgreSQL, focusing on secure and resilient data flow.",
    skills: ["React", "Node.js", "Express.js", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    icon: "Layers",
    badge: "Full Stack Systems"
  },
  {
    id: "m3",
    year: "PHASE 03",
    status: "COMPLETED",
    title: "AI/ML & Data-Driven Intelligence",
    description: "Explored machine learning methodologies, computer vision pipelines, and high-performance Python backends using FastAPI. Applied models to real-world structured datasets and environmental signals.",
    skills: ["Python", "FastAPI", "Machine Learning", "Computer Vision", "Data Analytics"],
    icon: "Brain",
    badge: "Intelligent Systems"
  },
  {
    id: "m4",
    year: "PHASE 04",
    status: "CURRENT FOCUS",
    title: "Advanced Weather & Ocean Analytics Platforms",
    description: "Architected cutting-edge big data platforms: VarshaNet 2.0 for real-time weather & disaster intelligence with geospatial GIS queries, and Ocean Intelligence for marine anomaly tracking.",
    skills: ["PostGIS", "FastAPI", "GIS Spatial Data", "Docker", "Three.js 3D Visuals"],
    icon: "Globe",
    badge: "Specialized Engineering"
  }
];
