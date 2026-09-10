import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ThrillingSectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const ThrillingSectionWrapper: React.FC<ThrillingSectionWrapperProps> = ({
  children,
  id,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // 3D Perspective transforms tied to scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.94, 1, 1, 0.94]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [8, 0, 0, -8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  return (
    <div
      ref={containerRef}
      id={id}
      style={{ perspective: '1200px' }}
      className={`relative w-full ${className}`}
    >
      <motion.div
        style={{
          opacity,
          scale,
          rotateX,
          y,
          transformStyle: 'preserve-3d',
        }}
        transition={{ ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};
