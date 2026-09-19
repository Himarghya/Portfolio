import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const SmoothScrollManager: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

          // Update SVG progress ring directly without triggering React re-renders
          if (circleRef.current) {
            circleRef.current.style.strokeDashoffset = `${125.66 - (125.66 * progress) / 100}`;
          }

          const visible = scrollTop > 200;
          const nearBottom = progress > 85;

          setIsVisible((prev) => (prev !== visible ? visible : prev));
          setIsNearBottom((prev) => (prev !== nearBottom ? nearBottom : prev));

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Smooth Anchor Interceptor for all in-page # links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          const headerOffset = 70;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const scrollToToggle = () => {
    if (isNearBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-40 select-none"
        >
          <button
            onClick={scrollToToggle}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#101116]/90 hover:bg-[#16171f] backdrop-blur-2xl border border-white/15 hover:border-[#E50914]/70 shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all duration-300 cursor-pointer active:scale-95"
            title={isNearBottom ? 'Scroll to Top' : 'Scroll to Bottom'}
            aria-label="Toggle smooth scroll position"
          >
            {/* SVG Circular Scroll Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                className="stroke-white/10 fill-none"
                strokeWidth="2.5"
              />
              <circle
                ref={circleRef}
                cx="24"
                cy="24"
                r="20"
                className="stroke-[#E50914] fill-none transition-all duration-75"
                strokeWidth="2.5"
                strokeDasharray={125.66}
                strokeDashoffset={125.66}
                strokeLinecap="round"
              />
            </svg>

            {/* Directional Navigation Icon */}
            <div className="relative z-10 text-white transition-transform duration-300 group-hover:scale-110">
              {isNearBottom ? (
                <ChevronUp className="w-5 h-5 text-white group-hover:text-[#E50914] transition-colors" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white group-hover:text-[#E50914] transition-colors" />
              )}
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
