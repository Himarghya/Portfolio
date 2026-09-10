export interface NetflixProfile {
  id: string;
  name: string;
  role: string;
  avatarBg: string;
  avatarIcon: string;
  greeting: string;
}

export interface NetflixItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  matchPercentage: number;
  ageRating: string;
  durationOrYear: string;
  quality: string;
  synopsis: string;
  detailedOverview: string;
  cast: string[]; // Technologies
  genres: string[];
  tags: string[];
  backdropColor: string;
  badge?: string;
  type3D?: 'weather-globe' | 'ocean-sphere' | 'medical-hud' | 'card-deck';
  liveUrl?: string;
  githubUrl?: string;
  keyHighlights: string[];
  episodes?: {
    episodeNumber: number;
    title: string;
    duration: string;
    description: string;
    tech: string;
  }[];
}

export const NETFLIX_PROFILES: NetflixProfile[] = [
  {
    id: 'recruiter',
    name: 'Recruiter',
    role: 'Talent Acquisition & Hiring Lead',
    avatarBg: 'bg-gradient-to-br from-blue-600 to-indigo-800',
    avatarIcon: '💼',
    greeting: 'Welcome! Explore top flagship releases, skills matrix, and verified resume credentials.'
  },
  {
    id: 'tech_lead',
    name: 'Tech Lead / CTO',
    role: 'Engineering Director & System Architect',
    avatarBg: 'bg-gradient-to-br from-red-600 to-rose-900',
    avatarIcon: '⚡',
    greeting: 'Inspecting C++ algorithmic rigor, backend scalability, and database schemas.'
  },
  {
    id: 'developer',
    name: 'Peer Dev',
    role: 'Fellow Coder & Open Source Hacker',
    avatarBg: 'bg-gradient-to-br from-emerald-600 to-teal-800',
    avatarIcon: '💻',
    greeting: 'Looking for cool WebGL visualizers, clean React architecture, and terminal tricks.'
  },
  {
    id: 'guest',
    name: 'Curious Guest',
    role: 'Explorer & Creator',
    avatarBg: 'bg-gradient-to-br from-amber-500 to-orange-700',
    avatarIcon: '🍿',
    greeting: 'Grab some popcorn and stream the interactive developer portfolio of Himarghya Das.'
  }
];

export const BILLBOARD_FEATURED: NetflixItem = {
  id: 'himarghya-featured',
  title: 'HIMARGHYA DAS',
  subtitle: 'The Full Stack Architect & C++ Systems Engineer',
  category: 'DEVFLIX ORIGINAL SERIES',
  matchPercentage: 99,
  ageRating: 'TV-MA',
  durationOrYear: '2026',
  quality: '4K Ultra HD',
  synopsis: 'Bridging the gap between high-performance lower-level C++ algorithms and high-velocity modern web ecosystems. From real-time geospatial rainfall telemetry to interactive 3D WebGL experiences, precision engineering meets cinematic digital design.',
  detailedOverview: 'Himarghya Das is a versatile Full Stack Developer and competitive problem solver who specializes in resilient web architectures, performant C++ backend logic, and immersive user experiences. Ready for high-impact software engineering roles and visionary product teams.',
  cast: ['C++20', 'React 18', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'PostGIS', 'Docker', 'Three.js'],
  genres: ['Full Stack Web', 'C++ Optimization', 'Geospatial GIS', 'Interactive WebGL', 'Distributed Systems'],
  tags: ['High Octane', 'Critically Acclaimed', 'Scalable', 'Top Rated'],
  backdropColor: 'from-red-950/80 via-black/90 to-[#141414]',
  badge: 'TOP 10 IN TECH TODAY',
  liveUrl: '#projects',
  githubUrl: 'https://github.com/Himarghya',
  keyHighlights: [
    'Architected VarshaNet Big Data Precipitation radar mapping platform',
    'Engineered 3D Hydrographic Marine Ocean telemetry simulation',
    'Advanced proficiency in C++ STL, Graph Theory, and Memory Bounds',
    'Modern React & TypeScript component architectures with 60fps animations'
  ]
};

export const TRENDING_PROJECTS: NetflixItem[] = [
  {
    id: 'varshanet',
    title: 'VarshaNet Core',
    subtitle: 'Weather Big Data GIS Platform',
    category: 'Flagship Platform',
    matchPercentage: 99,
    ageRating: 'TV-MA',
    durationOrYear: '2025 - 2026',
    quality: '4K HDR',
    synopsis: 'An end-to-end meteorological GIS system ingesting regional precipitation datasets, generating spatial contours, and rendering real-time radar overlays.',
    detailedOverview: 'VarshaNet processes high-throughput geospatial time-series weather telemetry. It uses PostGIS spatial indexing for fast polygon queries, paired with FastAPI caching layers and interactive MapLibre/WebGL radar overlays.',
    cast: ['FastAPI', 'PostGIS', 'React', 'Python', 'Docker', 'GeoJSON'],
    genres: ['Big Data GIS', 'Weather Systems', 'Spatial Analytics'],
    tags: ['Realtime Radar', 'Geospatial Indexing', 'High Concurrency'],
    backdropColor: 'from-cyan-950 via-slate-900 to-[#141414]',
    type3D: 'weather-globe',
    badge: '#1 IN TRENDING TODAY',
    githubUrl: 'https://github.com/Himarghya',
    liveUrl: 'https://github.com/Himarghya',
    keyHighlights: [
      'Spatial PostGIS indexing reducing query latency by 72%',
      'Interactive radar sweep with precipitation isobar mapping',
      'Containerized microservice architecture with automated health checks'
    ],
    episodes: [
      { episodeNumber: 1, title: 'Spatial Ingestion Pipeline', duration: 'Season 1', description: 'Real-time ingestion of meteorological sensor grids and GRIB2 files.', tech: 'Python + PostGIS' },
      { episodeNumber: 2, title: 'Polygon Contour Generation', duration: 'Season 1', description: 'Isobar interpolation algorithms generating vector rain contours.', tech: 'NumPy + Shapely' },
      { episodeNumber: 3, title: 'WebGL Radar Visualization', duration: 'Season 1', description: 'Client-side GPU shader rendering of radar precipitation loops.', tech: 'React + WebGL' }
    ]
  },
  {
    id: 'ocean-telemetry',
    title: 'Ocean Telemetry GIS',
    subtitle: 'Marine Observation & Hydrographic Stream',
    category: 'Telemetry Engine',
    matchPercentage: 98,
    ageRating: 'TV-14',
    durationOrYear: '2025',
    quality: 'HD',
    synopsis: 'Interactive bathymetric marine platform tracking oceanic sensor buoys, current vectors, and deep-sea temperature anomalies.',
    detailedOverview: 'Built to aggregate marine observation datasets across multiple geographical coordinates. Implements interactive 3D hydrographic simulations and real-time telemetry streaming.',
    cast: ['Python', 'Docker', 'Three.js', 'FastAPI', 'PostgreSQL'],
    genres: ['Marine Tech', 'Hydrographic GIS', '3D Visuals'],
    tags: ['Buoy Telemetry', 'Current Vectors', 'Bathymetry'],
    backdropColor: 'from-blue-950 via-slate-900 to-[#141414]',
    type3D: 'ocean-sphere',
    badge: '#2 IN TRENDING TODAY',
    githubUrl: 'https://github.com/Himarghya',
    liveUrl: 'https://github.com/Himarghya',
    keyHighlights: [
      'Bathymetric 3D current vector visualizer in Three.js',
      'Real-time anomaly detection for ocean temperature swings',
      'Resilient Docker deployment ready for edge devices'
    ],
    episodes: [
      { episodeNumber: 1, title: 'Deep Sea Buoy Ingestion', duration: 'Ep 1', description: 'Connecting remote oceanographic sensor beacons to central API gateway.', tech: 'FastAPI + MQTT' },
      { episodeNumber: 2, title: 'Bathymetric Flow Matrix', duration: 'Ep 2', description: '3D vector fields mapping subsurface ocean currents and tides.', tech: 'Three.js + Shaders' }
    ]
  },
  {
    id: 'clinical-hud',
    title: 'Clinical Telemetry HUD',
    subtitle: 'Patient-Doctor Healthcare Telemetry',
    category: 'Full-Stack System',
    matchPercentage: 97,
    ageRating: 'TV-PG',
    durationOrYear: '2024 - 2025',
    quality: 'HD',
    synopsis: 'A comprehensive medical workflow portal managing patient health records, live doctor queues, and encrypted vital sign feeds.',
    detailedOverview: 'Engineered with strict data integrity and privacy rules. Features role-based access control (RBAC), appointment scheduling, and real-time doctor telemetry feeds.',
    cast: ['React', 'Node.js', 'PostgreSQL', 'Express', 'Tailwind CSS'],
    genres: ['HealthTech', 'Enterprise Workflow', 'RBAC Security'],
    tags: ['Live Queue', 'Secure Telemetry', 'Postgres Pool'],
    backdropColor: 'from-emerald-950 via-slate-900 to-[#141414]',
    type3D: 'medical-hud',
    badge: '#3 IN TRENDING TODAY',
    githubUrl: 'https://github.com/Himarghya',
    liveUrl: 'https://github.com/Himarghya',
    keyHighlights: [
      'Full CRUD with PostgreSQL connection pool & transaction rollback',
      'Real-time vital stats display and queue management system',
      'Enterprise RBAC with JWT token security'
    ]
  },
  {
    id: 'card-deck',
    title: 'Card Archive Engine',
    subtitle: 'High-Density Catalog & Aggregation',
    category: 'SSR Web App',
    matchPercentage: 95,
    ageRating: 'TV-G',
    durationOrYear: '2024',
    quality: 'HD',
    synopsis: 'A high-density indexed archive engine with server-side rendering, faceted multi-attribute filtering, and real-time catalog search.',
    detailedOverview: 'Built to demonstrate lightning-fast server-rendered views with deep PostgreSQL search indexing, dynamic templates, and responsive layouts.',
    cast: ['Node.js', 'Express', 'PostgreSQL', 'EJS', 'REST APIs'],
    genres: ['SSR Architecture', 'Catalog Engines', 'Search Indexing'],
    tags: ['Faceted Search', 'PostgreSQL Aggregations', 'EJS Views'],
    backdropColor: 'from-amber-950 via-slate-900 to-[#141414]',
    type3D: 'card-deck',
    badge: '#4 IN TRENDING TODAY',
    githubUrl: 'https://github.com/Himarghya',
    liveUrl: 'https://github.com/Himarghya',
    keyHighlights: [
      'Multi-column PostgreSQL GIN indexing for sub-10ms search',
      'Clean MVC pattern with modular route controllers',
      'Dynamic SSR layouts with responsive grid cards'
    ]
  }
];

export const TOP_TEN_SKILLS = [
  { rank: 1, name: 'C++', match: 99, category: 'Core Language', rating: 'TV-MA', desc: 'Modern C++20, STL algorithms, manual memory management, RAII, and low-latency system design.', tags: ['STL', 'Pointers', 'C++20', 'Graphs'] },
  { rank: 2, name: 'React', match: 98, category: 'Frontend', rating: 'TV-14', desc: 'Component architecture, custom hooks, Framer Motion, performance profiling, and state management.', tags: ['Hooks', 'Virtual DOM', 'State', 'Framer'] },
  { rank: 3, name: 'Python', match: 98, category: 'Backend & Data', rating: 'TV-14', desc: 'FastAPI microservices, asynchronous async/await pipelines, scientific packages, and automation scripts.', tags: ['FastAPI', 'NumPy', 'AsyncIO', 'Data'] },
  { rank: 4, name: 'PostgreSQL', match: 97, category: 'Database & GIS', rating: 'TV-MA', desc: 'Complex relational schemas, PostGIS spatial queries, indexing strategies, and connection pooling.', tags: ['PostGIS', 'SQL', 'Indexes', 'ACID'] },
  { rank: 5, name: 'TypeScript', match: 97, category: 'Language', rating: 'TV-14', desc: 'Strict static typing, generic constraints, enterprise API contracts, and type guards.', tags: ['Generics', 'Interfaces', 'Type Safety'] },
  { rank: 6, name: 'FastAPI', match: 96, category: 'Backend', rating: 'TV-PG', desc: 'High-speed Python web APIs, Pydantic validation, OpenAPI automated documentation, and async routers.', tags: ['Pydantic', 'OpenAPI', 'Async', 'REST'] },
  { rank: 7, name: 'Docker', match: 95, category: 'DevOps & Tools', rating: 'TV-14', desc: 'Multi-stage Dockerfiles, compose multi-container orchestration, and reproducible deployments.', tags: ['Containers', 'Compose', 'DevOps'] },
  { rank: 8, name: 'Three.js', match: 95, category: '3D Graphics', rating: 'TV-14', desc: 'WebGL scene graphs, custom shaders, geometry meshes, lighting, and GPU-accelerated interactive models.', tags: ['WebGL', 'Shaders', 'Canvas', '3D'] },
  { rank: 9, name: 'Algorithms', match: 99, category: 'Computer Science', rating: 'TV-MA', desc: 'Graph theory, dynamic programming, tree traversals, sorting, and algorithmic time complexity analysis.', tags: ['DSA', 'LeetCode', 'Optimization'] },
  { rank: 10, name: 'Machine Learning', match: 94, category: 'AI & Vision', rating: 'TV-PG', desc: 'Supervised learning models, computer vision image processing, model training, and evaluation.', tags: ['PyTorch', 'Vision', 'Scikit-Learn'] }
];

export const CRITICALLY_ACCLAIMED_SYSTEMS = [
  {
    id: 'sys-cpp',
    title: 'C++ Algorithmic Core',
    subtitle: 'Competitive Programming & Rigor',
    matchPercentage: 99,
    ageRating: 'TV-MA',
    durationOrYear: 'Continuous',
    quality: '4K',
    synopsis: 'Deep algorithmic problem solving covering Graph Theory (BFS, DFS, Dijkstra), Dynamic Programming, and Advanced Data Structures.',
    cast: ['C++20', 'STL', 'Algorithm Bounds', 'Memory Pointers'],
    tags: ['Zero Overhead', 'Memory Efficient', 'Data Structures']
  },
  {
    id: 'sys-fullstack',
    title: 'Full Stack Web Architecture',
    subtitle: 'Modern Scalable Applications',
    matchPercentage: 98,
    ageRating: 'TV-14',
    durationOrYear: 'Continuous',
    quality: '4K',
    synopsis: 'Building end-to-end production web applications combining sleek responsive React frontends with resilient REST & WebSocket backends.',
    cast: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'Tailwind'],
    tags: ['Responsive UI', 'API Gateway', 'Real-time']
  },
  {
    id: 'sys-gis',
    title: 'Geospatial GIS Engine',
    subtitle: 'Spatial Coordinates & Isobars',
    matchPercentage: 97,
    ageRating: 'TV-14',
    durationOrYear: '2025',
    quality: 'HD',
    synopsis: 'Ingesting massive latitude/longitude datasets, computing geometric intersections, and streaming interactive map overlays.',
    cast: ['PostGIS', 'GeoJSON', 'FastAPI', 'MapLibre'],
    tags: ['Spatial Indexes', 'Isobar Contours', 'Radar Sweeps']
  }
];

export const CAREER_SEASONS = [
  {
    season: 'Season 2026',
    title: 'Full Stack Architect & Scalable Systems',
    episodes: [
      {
        epNumber: 1,
        title: 'Architecting Enterprise & Interactive Web',
        duration: 'Present Episode',
        synopsis: 'Building cutting-edge WebGL portfolios, microservice web platforms, and exploring advanced AI/ML integrations.',
        tech: 'React 18 + TypeScript + Three.js + FastAPI'
      },
      {
        epNumber: 2,
        title: 'High-Impact Software Engineering Roles',
        duration: 'Continuous',
        synopsis: 'Actively interviewing and deploying scalable software systems for high-growth tech teams.',
        tech: 'Full Stack Engineering + Distributed Systems'
      }
    ]
  },
  {
    season: 'Season 2025',
    title: 'Geospatial Data & Deep Sea Telemetry',
    episodes: [
      {
        epNumber: 1,
        title: 'The Inception of VarshaNet GIS',
        duration: 'Major Release',
        synopsis: 'Designed and deployed an end-to-end weather radar platform with spatial PostGIS database optimization.',
        tech: 'FastAPI + PostGIS + Python + React'
      },
      {
        epNumber: 2,
        title: 'Oceanographic Telemetry Simulator',
        duration: 'Research Project',
        synopsis: 'Created interactive hydrographic simulations of deep sea buoy networks and ocean current fields.',
        tech: 'Docker + Python + Three.js'
      }
    ]
  },
  {
    season: 'Season 2024',
    title: 'Core C++ Rigor & Web Foundations',
    episodes: [
      {
        epNumber: 1,
        title: 'Mastering Data Structures & Algorithms',
        duration: 'Foundation',
        synopsis: 'Deep dive into C++ STL, algorithmic complexity, tree traversals, and dynamic programming.',
        tech: 'C++20 / STL / Graph Algorithms'
      },
      {
        epNumber: 2,
        title: 'Clinical Telemetry & Catalog Engines',
        duration: 'Full Stack',
        synopsis: 'Built healthcare workflow management portals and high-density PostgreSQL catalog search apps.',
        tech: 'Node.js + PostgreSQL + Express + EJS'
      }
    ]
  }
];

export const SHOWRUNNER_DOSSIER = {
  name: 'Himarghya Das',
  roleTitle: 'Full Stack Developer & C++ Programmer',
  location: 'India // Available Worldwide / Remote',
  status: 'Available for Full-Time Roles & High-Impact Projects',
  bio: 'A passionate developer and problem solver driven by a relentless desire to architect clean, performant, and unforgettable digital experiences. Specialized in Full Stack Web, C++ Algorithmic Systems, and Geospatial Data.',
  email: 'himarghyadas@gmail.com',
  github: 'https://github.com/Himarghya',
  linkedin: 'https://linkedin.com/in/himarghya',
  stats: [
    { label: 'MATCH RATING', value: '99%' },
    { label: 'CORE STACK', value: 'Full Stack + C++' },
    { label: 'MAJOR RELEASES', value: '4+ Production Apps' },
    { label: 'QUALITY', value: '4K Ultra HD' }
  ]
};