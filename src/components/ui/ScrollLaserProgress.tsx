import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollLaserProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none h-1 bg-transparent">
      {/* Laser Base Track Glow */}
      <motion.div
        className="h-full bg-gradient-to-r from-[#00FF87] via-[#A3FF12] to-[#6EE7B7] origin-left shadow-[0_0_12px_#00FF87,0_0_24px_rgba(0,255,135,0.6)]"
        style={{ scaleX }}
      />
    </div>
  );
};