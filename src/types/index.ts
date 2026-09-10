export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  techStack: string[];
  category: 'Full Stack' | 'Data / AI' | 'Web Systems' | 'Interactive';
  githubUrl?: string;
  liveUrl?: string;
  caseStudyAvailable: boolean;
  color: string;
  accentHex: string;
  type3D: 'weather-globe' | 'ocean-sphere' | 'medical-hud' | 'card-deck';
}

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Programming' | 'Tools' | 'AI / ML';
  levelText: string;
  iconName: string;
  color: string;
  description: string;
  tags: string[];
}

export interface TimelineMilestone {
  id: string;
  year: string;
  status: string;
  title: string;
  description: string;
  skills: string[];
  icon: string;
  badge?: string;
}

export interface TerminalCommand {
  command: string;
  description: string;
  output: string | string[];
}
