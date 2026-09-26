import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ExternalLink,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Terminal,
  Flame,
  Layers,
  Database,
  Cpu,
  Server
} from 'lucide-react';

interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Backend' | 'Databases' | 'Distributed Systems' | 'Modern C++' | 'System Design';
  categoryIcon: React.ElementType;
  readingTime: string;
  date: string;
  excerpt: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  badge?: string;
  slugUrl: string;
}

const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-1',
    slug: 'how-i-structure-my-nodejs-projects',
    title: 'How I Structure My Node.js Projects',
    subtitle: 'A practical approach to separating routes, controllers, services, and repositories without over-engineering.',
    category: 'Backend',
    categoryIcon: Server,
    readingTime: '8 min read',
    date: 'Sep 2026',
    excerpt: 'When building backend systems, simple Express setups quickly turn into tangled messes. Here is the modular 4-layer architecture I use to keep codebases testable, maintainable, and predictable.',
    tags: ['Node.js', 'TypeScript', 'Express', 'Clean Code'],
    gradient: 'from-blue-600/30 via-indigo-900/20 to-black',
    accentColor: '#3B82F6',
    badge: 'NEW RELEASE',
    slugUrl: 'https://himarghya-blog.onrender.com/blog/how-i-structure-my-nodejs-projects'
  },
  {
    id: 'blog-2',
    slug: 'postgresql-indexing-beyond-btree',
    title: 'PostgreSQL Indexing: Beyond B-Tree',
    subtitle: 'When B-Trees fail: leveraging GiST, GIN, and BRIN for high-throughput timeseries and spatial datasets.',
    category: 'Databases',
    categoryIcon: Database,
    readingTime: '10 min read',
    date: 'Aug 2026',
    excerpt: 'A practical deep dive into BRIN for gigabyte-scale telemetry, GIN for JSONB payload queries, and GiST for geospatial bounding boxes with PostGIS.',
    tags: ['PostgreSQL', 'PostGIS', 'Performance', 'Indexing'],
    gradient: 'from-emerald-600/30 via-teal-900/20 to-black',
    accentColor: '#10B981',
    badge: 'DEEP DIVE',
    slugUrl: 'https://himarghya-blog.onrender.com/blog/postgresql-indexing-beyond-btree'
  },
  {
    id: 'blog-3',
    slug: 'designing-reliable-job-queues-with-redis',
    title: 'Designing Reliable Job Queues with Redis & Leases',
    subtitle: 'Avoiding duplicate executions, handling worker crashes, and ensuring strict idempotency.',
    category: 'Distributed Systems',
    categoryIcon: Layers,
    readingTime: '9 min read',
    date: 'Sep 2026',
    excerpt: 'How we engineered atomic worker leases in PulseMesh using Redis distributed locks, monotonic fencing tokens in Postgres, and SSE telemetry streaming.',
    tags: ['Redis', 'Distributed Systems', 'Queues', 'Lua'],
    gradient: 'from-red-600/30 via-rose-900/20 to-black',
    accentColor: '#E50914',
    badge: 'TRENDING',
    slugUrl: 'https://himarghya-blog.onrender.com/blog/designing-reliable-job-queues-with-redis'
  },
  {
    id: 'blog-4',
    slug: 'understanding-move-semantics-memory-modern-cpp',
    title: 'Move Semantics & Memory in Modern C++',
    subtitle: 'Rvalue references, std::move, RAII, and zero-cost abstractions without compiler jargon.',
    category: 'Modern C++',
    categoryIcon: Cpu,
    readingTime: '11 min read',
    date: 'Aug 2026',
    excerpt: 'Deconstructing value categories (lvalues vs rvalues), move constructors, perfect forwarding, and why std::move does not actually move anything at runtime.',
    tags: ['C++20', 'RAII', 'Memory', 'Performance'],
    gradient: 'from-purple-600/30 via-violet-900/20 to-black',
    accentColor: '#8B5CF6',
    badge: 'SYSTEMS',
    slugUrl: 'https://himarghya-blog.onrender.com/blog/understanding-move-semantics-memory-modern-cpp'
  },
  {
    id: 'blog-5',
    slug: 'building-resilient-systems-failure-modes',
    title: 'Building Resilient Systems: Failure Modes',
    subtitle: 'Mental models for designing software that degrades gracefully under cascading failures.',
    category: 'System Design',
    categoryIcon: Server,
    readingTime: '7 min read',
    date: 'Jul 2026',
    excerpt: 'Why distributed systems always fail in unexpected ways, and architectural patterns like circuit breakers, jitter backoff, and bulkhead isolation.',
    tags: ['Reliability', 'System Design', 'Circuit Breaker'],
    gradient: 'from-amber-600/30 via-orange-900/20 to-black',
    accentColor: '#F59E0B',
    badge: 'TOP RATED',
    slugUrl: 'https://himarghya-blog.onrender.com/blog/building-resilient-systems-failure-modes'
  }
];

export const NetflixBlog: React.FC = () => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenBlogUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="blog" className="relative px-4 sm:px-12 py-8 select-none scroll-mt-20">
      {/* Header with Title and "View All" Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914] text-[11px] font-mono tracking-wider uppercase font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>Technical Writing &amp; Journal</span>
            </div>
          </div>
          
          <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wider flex items-center gap-2">
            <span>ENGINEERING BLOG</span>
            <span className="text-[#E50914] text-xl sm:text-2xl font-sans font-black">/</span>
            <span className="text-zinc-400 text-xl sm:text-2xl tracking-normal font-sans font-medium">Originals</span>
          </h2>
          
          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl font-light">
            Deep dives into distributed systems, backend architectures, PostgreSQL internals, and modern C++.
          </p>
        </div>

        {/* Action Button: Open Full Blog */}
        <a
          href="https://himarghya-blog.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-[#E50914] text-zinc-200 hover:text-white border border-white/10 hover:border-[#E50914] transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_0_24px_rgba(229,9,20,0.5)] text-xs font-semibold shrink-0 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-[#E50914] group-hover/btn:text-white transition-colors" />
          <span>Visit Full Blog</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Interactive Carousel Container */}
      <div className="relative group/carousel">
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-28 sm:h-36 bg-black/80 hover:bg-black/95 text-white flex items-center justify-center rounded-r-2xl border-y border-r border-white/20 shadow-2xl backdrop-blur-md transition-all cursor-pointer hover:scale-105"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </button>
        )}

        {/* Scrollable Row */}
        <div
          ref={rowRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-4 px-1 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {BLOG_ARTICLES.map((article) => {
            const Icon = article.categoryIcon;
            return (
              <div
                key={article.id}
                onClick={() => handleOpenBlogUrl(article.slugUrl)}
                className="w-[82vw] max-w-[340px] sm:w-[380px] lg:w-[410px] shrink-0 group/card relative cursor-pointer"
              >
                {/* Netflix Glass Card */}
                <div className="h-full rounded-2xl bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/10 group-hover/card:border-[#E50914]/60 shadow-[0_12px_32px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.12)] group-hover/card:shadow-[0_20px_45px_rgba(229,9,20,0.25),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-300 flex flex-col justify-between overflow-hidden group-hover/card:-translate-y-1.5">
                  
                  {/* Top Ambient Banner */}
                  <div className={`relative w-full h-36 bg-gradient-to-br ${article.gradient} p-4 flex flex-col justify-between overflow-hidden border-b border-white/10`}>
                    {/* Subtle grid texture overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
                    
                    {/* Top Row: Category Pill & Badge */}
                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-zinc-200">
                        <Icon className="w-3.5 h-3.5 text-zinc-300" />
                        <span>{article.category}</span>
                      </div>

                      {article.badge && (
                        <span className="px-2 py-0.5 rounded-md bg-[#E50914] text-white text-[10px] font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(229,9,20,0.6)]">
                          {article.badge}
                        </span>
                      )}
                    </div>

                    {/* Bottom Row on Banner: Date & Read Time */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-300 font-mono">
                      <span>{article.date}</span>
                      <div className="flex items-center gap-1 text-zinc-300">
                        <Clock className="w-3 h-3 text-[#E50914]" />
                        <span>{article.readingTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Title */}
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover/card:text-red-400 transition-colors line-clamp-1">
                        {article.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-zinc-400 text-xs font-medium line-clamp-2 mt-1">
                        {article.subtitle}
                      </p>

                      {/* Excerpt */}
                      <p className="text-zinc-400 text-xs font-light line-clamp-2 mt-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Tags & Action Link */}
                    <div className="space-y-3 pt-2 border-t border-white/[0.06]">
                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] text-zinc-300 font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Read Article Callout Button */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-mono text-zinc-400 group-hover/card:text-white transition-colors flex items-center gap-1">
                          <span>Read Full Article</span>
                        </span>
                        
                        <div className="w-7 h-7 rounded-lg bg-white/[0.06] group-hover/card:bg-[#E50914] border border-white/15 group-hover/card:border-[#E50914] flex items-center justify-center text-zinc-300 group-hover/card:text-white transition-all shadow-sm">
                          <ArrowUpRight className="w-4 h-4 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-28 sm:h-36 bg-black/80 hover:bg-black/95 text-white flex items-center justify-center rounded-l-2xl border-y border-l border-white/20 shadow-2xl backdrop-blur-md transition-all cursor-pointer hover:scale-105"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </button>
        )}
      </div>

      {/* Featured Callout Banner for Himarghya_Blog */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-red-950/40 via-zinc-900/60 to-black/80 border border-[#E50914]/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_8px_32px_rgba(229,9,20,0.15)] relative overflow-hidden">
        {/* Glow behind */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#E50914]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 font-medium tracking-wider uppercase">
              LIVE TECHNICAL BLOG PLATFORM
            </span>
          </div>

          <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
            EXPLORE THE FULL BLOG AT HIMARGHYA-BLOG.ONRENDER.COM
          </h3>

          <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
            Featuring interactive architecture diagrams, live system simulators, global search (<kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">Cmd+K</kbd>), reading estimates, and full source breakdowns.
          </p>
        </div>

        <a
          href="https://himarghya-blog.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E50914] to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold text-xs tracking-wider uppercase shadow-[0_4px_24px_rgba(229,9,20,0.5)] hover:shadow-[0_6px_30px_rgba(229,9,20,0.8)] transition-all duration-300 hover:scale-105 shrink-0 cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Open Live Blog</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
