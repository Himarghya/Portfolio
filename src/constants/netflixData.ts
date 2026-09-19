export interface NetflixProfile {
  id: string;
  name: string;
  role: string;
  avatarBg: string;
  avatarGradient: string;
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
  cast: string[];
  genres: string[];
  tags: string[];
  backdropColor: string;
  badge?: string;
  type3D?: 'weather-globe' | 'ocean-sphere' | 'medical-hud' | 'card-deck';
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  posterImage?: string;
  keyHighlights: string[];
  metrics?: { label: string; value: string }[];
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
    id: 'developer',
    name: 'Developer',
    role: 'Full Stack & Systems Engineer',
    avatarBg: 'bg-emerald-600',
    avatarGradient: 'from-emerald-500 to-teal-700',
    avatarIcon: 'DEV',
    greeting: 'Reviewing systems architecture, C++ memory models, and frontend design.'
  },
  {
    id: 'tech_lead',
    name: 'Engineering Lead',
    role: 'Architecture & Scalability',
    avatarBg: 'bg-blue-600',
    avatarGradient: 'from-blue-600 to-indigo-800',
    avatarIcon: 'LEAD',
    greeting: 'Analyzing real-time performance, GIS pipelines, and low-latency throughput.'
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    role: 'Hiring & Technical Talent',
    avatarBg: 'bg-rose-600',
    avatarGradient: 'from-rose-500 to-red-700',
    avatarIcon: 'TALENT',
    greeting: 'Welcome. Take a look at key achievements, live projects, and technical skills.'
  },
  {
    id: 'guest',
    name: 'Visitor',
    role: 'General Exploration',
    avatarBg: 'bg-purple-600',
    avatarGradient: 'from-purple-600 to-fuchsia-700',
    avatarIcon: 'VISITOR',
    greeting: 'Explore the interactive portfolio, 3D orbits, and code repositories.'
  }
];

export const BILLBOARD_FEATURED: NetflixItem = {
  id: 'himarghya-featured',
  title: 'HIMARGHYA DAS',
  subtitle: 'Software Engineer & Full Stack Developer',
  category: 'ENGINEER PROFILE',
  matchPercentage: 99,
  ageRating: 'PRODUCTION',
  durationOrYear: '2026',
  quality: 'FULL STACK',
  synopsis: 'I write backend services in C++ and Python, and build web applications with React and TypeScript. I focus on clean architecture, fast database queries, and usable interfaces.',
  detailedOverview: 'I am a software engineer focused on building practical, high-throughput applications. My recent work includes geospatial weather telemetry pipelines, distributed job queues, and Arctic logistics systems with offline sync.',
  cast: ['C++20', 'React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'PostGIS', 'Docker'],
  genres: ['Full Stack Systems', 'Geospatial GIS', 'Distributed Architecture'],
  tags: ['High Concurrency', 'Spatial Indexing', 'Clean Architecture'],
  backdropColor: 'bg-zinc-900',
  badge: 'AVAILABLE FOR WORK',
  liveUrl: '#projects',
  githubUrl: 'https://github.com/Himarghya',
  keyHighlights: [
    'Built VarshaNet geospatial weather radar system handling millions of precipitation datapoints',
    'Created PulseMesh distributed job queue with persistent storage and recovery workers',
    'Developed Polaris cold-chain expedition logistics planner with offline IndexedDB caching',
    'Proficient with modern C++ STL, data structures, and relational SQL optimization'
  ],
  metrics: [
    { label: 'Latency Reduction', value: '72% via PostGIS Indexes' },
    { label: 'Job Throughput', value: '10k+ ops/sec benchmark' },
    { label: 'Production Projects', value: '4 Complete Systems' }
  ]
};

export const TRENDING_PROJECTS: NetflixItem[] = [
  {
    id: 'varshanet',
    title: 'VarshaNet',
    subtitle: 'Precipitation Radar & Disaster Intelligence',
    category: 'Geospatial Pipeline',
    matchPercentage: 99,
    ageRating: 'GIS',
    durationOrYear: '2025 - 2026',
    quality: 'POSTGIS',
    synopsis: 'A weather intelligence system that ingests regional precipitation datasets, runs spatial contour analysis, and renders real-time radar overlays on interactive maps.',
    detailedOverview: 'Built to process high-volume precipitation telemetry. Uses PostGIS spatial indexing for sub-50ms polygon queries, combined with FastAPI async endpoints and MapLibre vector layers.',
    cast: ['FastAPI', 'PostGIS', 'React', 'Python', 'Docker', 'GeoJSON'],
    genres: ['Geospatial GIS', 'Meteorological Pipelines', 'Spatial Analytics'],
    tags: ['Radar Sweeps', 'PostGIS Indexing', 'FastAPI'],
    backdropColor: 'bg-zinc-900',
    badge: 'CORE PROJECT',
    videoUrl: '/videos/varshanet.mp4',
    githubUrl: 'https://github.com/Himarghya/SIH-26069-VARSHANET-Team_TechTonic',
    liveUrl: 'https://github.com/Himarghya/SIH-26069-VARSHANET-Team_TechTonic',
    keyHighlights: [
      'Indexed 4.2 million geographic data points with PostGIS GIST indexes',
      'Calculates rainfall intensity contours in under 120ms',
      'Containerized microservices with automated Docker health checks'
    ],
    metrics: [
      { label: 'Query Speed', value: '< 50ms' },
      { label: 'Data Points', value: '4.2M' },
      { label: 'Map Layers', value: 'INSAT & DWR' }
    ],
    episodes: [
      { episodeNumber: 1, title: 'Spatial Ingestion Pipeline', duration: 'Pipeline', description: 'Ingestion of meteorological sensor grids and rainfall records into PostgreSQL.', tech: 'Python + PostGIS' },
      { episodeNumber: 2, title: 'Polygon Contour Generation', duration: 'Algorithm', description: 'Isobar interpolation routines that generate vector rainfall zones.', tech: 'NumPy + Shapely' },
      { episodeNumber: 3, title: 'Map Visualization Layer', duration: 'Frontend', description: 'Interactive MapLibre canvas rendering radar sweeps and alert zones.', tech: 'React + MapLibre' }
    ]
  },
  {
    id: 'pulsemesh',
    title: 'PulseMesh',
    subtitle: 'Distributed Task Queue & Workflow Engine',
    category: 'Distributed Systems',
    matchPercentage: 98,
    ageRating: 'QUEUE',
    durationOrYear: '2025 - 2026',
    quality: 'NODE / REDIS',
    synopsis: 'A distributed job orchestration system with atomic task leases, worker heartbeat tracking, exponential backoff retries, and real-time SSE telemetry.',
    detailedOverview: 'Engineered to handle bursty workloads reliably. Implements concurrency-safe queue polling, dead-letter queue routing, and automated worker failover detection.',
    cast: ['Node.js', 'Express', 'React', 'SSE', 'Redis', 'Tailwind'],
    genres: ['Distributed Systems', 'Task Queues', 'Workflow Automation'],
    tags: ['Heartbeats', 'Dead Letter Queue', 'SSE Streaming'],
    backdropColor: 'bg-zinc-900',
    badge: 'DISTRIBUTED QUEUE',
    githubUrl: 'https://github.com/Himarghya/PulseMesh',
    liveUrl: 'https://github.com/Himarghya/PulseMesh',
    keyHighlights: [
      'Processed 12,000 tasks/minute during load tests with zero task loss',
      'Automatic worker node crash detection within 5 seconds using heartbeats',
      'Real-time DAG visualization for multi-step task execution chains'
    ],
    metrics: [
      { label: 'Test Load', value: '12k tasks/min' },
      { label: 'Failover Window', value: '5 seconds' },
      { label: 'Telemetry', value: 'Zero-drop SSE' }
    ],
    episodes: [
      { episodeNumber: 1, title: 'Atomic Queue Core', duration: 'Backend', description: 'Lease management and task status transitions with optimistic concurrency.', tech: 'Node.js + Redis' },
      { episodeNumber: 2, title: 'Worker Heartbeat Watchdog', duration: 'Recovery', description: 'Background service reassigning orphaned jobs from failed workers.', tech: 'Express + Cron' }
    ]
  },
  {
    id: 'polaris',
    title: 'Polaris Arctic Logistics',
    subtitle: 'Cold-Chain Expedition Management System',
    category: 'Logistics GIS',
    matchPercentage: 97,
    ageRating: 'PWA',
    durationOrYear: '2025 - 2026',
    quality: 'OFFLINE SYNC',
    synopsis: 'An expedition resource and route optimization platform built for extreme environments, supporting offline IndexedDB caching and satellite synchronization.',
    detailedOverview: 'Designed for field operators working with intermittent connectivity. Calculates terrain safety routes, monitors fuel burn rates across supply convoys, and syncs automatically when satellite uplinks connect.',
    cast: ['React', 'TypeScript', 'FastAPI', 'Leaflet', 'IndexedDB', 'Docker'],
    genres: ['Logistics', 'Offline Systems', 'Field Operations'],
    tags: ['Offline PWA', 'Satellite Sync', 'Terrain Routing'],
    backdropColor: 'bg-zinc-900',
    badge: 'EXPEDITION SYSTEM',
    videoUrl: '/videos/polaris.mp4',
    githubUrl: 'https://github.com/Himarghya/SIH26062',
    liveUrl: 'https://github.com/Himarghya/SIH26062',
    keyHighlights: [
      'Full offline functionality with IndexedDB queue and conflict resolution',
      'Dynamic waypoint route calculation factoring in elevation and temperature',
      'Real-time cargo manifest tracking with QR verification workflows'
    ],
    metrics: [
      { label: 'Route Calc Time', value: '180ms' },
      { label: 'Offline Support', value: '100% Core Ops' },
      { label: 'Cache Storage', value: 'IndexedDB' }
    ],
    episodes: [
      { episodeNumber: 1, title: 'Offline-First Data Layer', duration: 'Client', description: 'Local transaction queues that replay mutations once connectivity resumes.', tech: 'IndexedDB + Dexie' },
      { episodeNumber: 2, title: 'Polar Route Solver', duration: 'Engine', description: 'Shortest path algorithms weighted by terrain slope and blizzard warnings.', tech: 'FastAPI + NetworkX' }
    ]
  },
  {
    id: 'campusos',
    title: 'CampusOS',
    subtitle: 'Smart Campus Operating System & Portal',
    category: 'Full Stack Enterprise',
    matchPercentage: 96,
    ageRating: 'MONOREPO',
    durationOrYear: '2025',
    quality: 'FULL STACK',
    synopsis: 'A comprehensive campus management operating system integrating course scheduling, academic attendance, resource reservations, and real-time announcements.',
    detailedOverview: 'Monorepo architecture uniting a React TypeScript frontend with an Express/PostgreSQL backend service. Provides role-based portals for students, faculty, and administrators.',
    cast: ['React', 'Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Tailwind'],
    genres: ['Campus ERP', 'Role-Based Access', 'Monorepo Systems'],
    tags: ['RBAC', 'Monorepo', 'PostgreSQL'],
    backdropColor: 'bg-zinc-900',
    badge: 'ENTERPRISE SYSTEM',
    githubUrl: 'https://github.com/Himarghya/CampusOS',
    liveUrl: 'https://github.com/Himarghya/CampusOS',
    keyHighlights: [
      'Unified student and faculty portal with granular JWT role permissions',
      'Full-stack TypeScript monorepo with automated deployment scripts',
      'Automated attendance tracking and resource scheduling algorithms'
    ],
    metrics: [
      { label: 'Architecture', value: 'Monorepo' },
      { label: 'Database', value: 'PostgreSQL' },
      { label: 'Auth', value: 'JWT RBAC' }
    ]
  },
  {
    id: 'ocean-telemetry',
    title: 'Hydrographic Ocean Telemetry',
    subtitle: 'Marine Sensor & Bathymetric Simulation',
    category: 'Marine Telemetry',
    matchPercentage: 95,
    ageRating: 'TELEMETRY',
    durationOrYear: '2025',
    quality: 'PYTHON / 3D',
    synopsis: 'A marine observation platform that collects oceanic sensor buoy readings, current velocity vectors, and temperature anomaly points.',
    detailedOverview: 'Gathers and visualizes ocean sensor feeds across multiple latitude and longitude bounds, displaying flow vector fields and subsurface telemetry.',
    cast: ['Python', 'Docker', 'Three.js', 'FastAPI', 'PostgreSQL'],
    genres: ['Marine Telemetry', 'Sensor Streams', 'Interactive Data'],
    tags: ['Buoy Feeds', 'Vector Fields', 'Telemetry API'],
    backdropColor: 'bg-zinc-900',
    badge: 'TELEMETRY ENGINE',
    githubUrl: 'https://github.com/Himarghya',
    liveUrl: 'https://github.com/Himarghya',
    keyHighlights: [
      'Parsed 120 sensor data packets/sec across simulated buoy stations',
      'Interactive 3D current vector visualizer built with Three.js',
      'Anomaly detection queries identifying rapid temperature drops'
    ],
    metrics: [
      { label: 'Ingestion Rate', value: '120 packets/s' },
      { label: 'Database', value: 'PostgreSQL' },
      { label: 'Visuals', value: 'Three.js' }
    ]
  }
];

export const TOP_TEN_SKILLS = [
  { rank: 1, name: 'C++', match: 99, category: 'Systems Language', rating: 'CORE', desc: 'Modern C++20, STL algorithms, memory management, pointers, RAII, and algorithmic problem solving.', tags: ['C++20', 'STL', 'Pointers', 'Data Structures'] },
  { rank: 2, name: 'React', match: 98, category: 'Frontend', rating: 'WEB', desc: 'Component design, state management, custom hooks, TypeScript integration, and responsive layouts.', tags: ['React 18', 'TypeScript', 'Hooks', 'Vite'] },
  { rank: 3, name: 'Python', match: 98, category: 'Backend & Data', rating: 'BACKEND', desc: 'FastAPI microservices, asynchronous task pipelines, data processing with NumPy, and script automation.', tags: ['FastAPI', 'NumPy', 'AsyncIO', 'REST'] },
  { rank: 4, name: 'PostgreSQL & PostGIS', match: 97, category: 'Database & Spatial', rating: 'DATA', desc: 'Relational schema design, spatial GIS indexing (GIST/SP-GIST), query tuning, and transactions.', tags: ['PostGIS', 'SQL', 'Indexes', 'Spatial'] },
  { rank: 5, name: 'TypeScript', match: 97, category: 'Language', rating: 'WEB', desc: 'Static typing, interfaces, generic constraints, and strict compile-time safety across codebases.', tags: ['Interfaces', 'Generics', 'Type Safety'] },
  { rank: 6, name: 'FastAPI', match: 96, category: 'API Framework', rating: 'API', desc: 'Asynchronous REST APIs, Pydantic data validation, OpenAPI specification, and background tasks.', tags: ['Pydantic', 'Async', 'OpenAPI', 'Uvicorn'] },
  { rank: 7, name: 'Docker', match: 95, category: 'Containers', rating: 'DEVOPS', desc: 'Containerizing frontend and backend services, multi-stage builds, and docker-compose configurations.', tags: ['Docker', 'Compose', 'CI/CD'] },
  { rank: 8, name: 'Node.js & Express', match: 95, category: 'Runtime', rating: 'BACKEND', desc: 'Event-driven servers, REST endpoints, Server-Sent Events (SSE), and background task workers.', tags: ['Node.js', 'Express', 'SSE', 'Workers'] },
  { rank: 9, name: 'Algorithms & DSA', match: 99, category: 'Computer Science', rating: 'CS', desc: 'Graph algorithms (BFS/DFS/Dijkstra), dynamic programming, tree structures, and complexity analysis.', tags: ['Graphs', 'DP', 'Complexity', 'Optimization'] },
  { rank: 10, name: 'Three.js / WebGL', match: 94, category: 'Graphics', rating: 'GRAPHICS', desc: 'Interactive 3D geometry rendering, scene graphs, lighting, and data visualization canvas layers.', tags: ['Three.js', 'WebGL', 'Canvas'] }
];

export const CAREER_SEASONS = [
  {
    season: '2025 - 2026',
    title: 'Full Stack Systems & Distributed Architecture',
    episodes: [
      {
        epNumber: 1,
        title: 'VarshaNet Weather GIS Engine',
        duration: 'Production System',
        synopsis: 'Designed and implemented an end-to-end precipitation tracking platform with PostGIS spatial indexing and interactive radar sweeps.',
        tech: 'FastAPI + PostGIS + Python + React'
      },
      {
        epNumber: 2,
        title: 'PulseMesh Task Orchestrator',
        duration: 'Distributed Queue',
        synopsis: 'Built a reliable job queue engine with worker heartbeat monitoring, automated retry backoff, and SSE telemetry streaming.',
        tech: 'Node.js + Express + React + Redis'
      },
      {
        epNumber: 3,
        title: 'Polaris Arctic Logistics Platform',
        duration: 'Offline PWA',
        synopsis: 'Engineered an expedition cold-chain management system supporting full offline capability and route calculation.',
        tech: 'React + TypeScript + FastAPI + IndexedDB'
      }
    ]
  },
  {
    season: '2024 - 2025',
    title: 'Data Structures, C++ Systems & Web Foundations',
    episodes: [
      {
        epNumber: 1,
        title: 'C++ Systems & Algorithmic Problem Solving',
        duration: 'Foundational',
        synopsis: 'Solved algorithmic problems covering graph traversals, dynamic programming, and custom data structure implementations.',
        tech: 'C++20 / STL / Graph Algorithms'
      },
      {
        epNumber: 2,
        title: 'Full Stack Web & Database Services',
        duration: 'Web Architecture',
        synopsis: 'Built responsive web interfaces and relational database backends with role-based authentication.',
        tech: 'React + Node.js + PostgreSQL'
      }
    ]
  }
];

export const SHOWRUNNER_DOSSIER = {
  name: 'Himarghya Das',
  roleTitle: 'Software Engineer & Full Stack Developer',
  location: 'India • Open to Remote & Relocation',
  status: 'Available for Software Engineering Roles',
  bio: 'I build software systems across the stack. My work spans backend microservices in Python and C++, database query optimization in PostgreSQL/PostGIS, and modern web applications in React and TypeScript.',
  email: 'himarghyadas@gmail.com',
  github: 'https://github.com/Himarghya',
  linkedin: 'https://linkedin.com/in/himarghya',
  stats: [
    { label: 'CORE LANGUAGES', value: 'C++, TypeScript, Python' },
    { label: 'DATABASES', value: 'PostgreSQL, PostGIS, Redis' },
    { label: 'SYSTEMS BUILT', value: '4 Key Applications' },
    { label: 'STATUS', value: 'Available for Hire' }
  ]
};