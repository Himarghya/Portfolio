import React from 'react';
import { motion } from 'framer-motion';

interface ScrollSnapWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const ScrollSnapWrapper: React.FC<ScrollSnapWrapperProps> = ({
  children,
  id,
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`snap-section relative w-full scroll-mt-20 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
};
