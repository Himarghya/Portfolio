import React, { useState, useEffect } from 'react';

interface CyberGlitchTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

export const CyberGlitchText: React.FC<CyberGlitchTextProps> = ({
  words,
  interval = 3000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0]);
  const [isScrambling, setIsScrambling] = useState(false);

  const chars = 'ABCDEF0123456789<>/_[]*#@%';

  useEffect(() => {
    const timer = setInterval(() => {
      setIsScrambling(true);
      const nextIndex = (currentIndex + 1) % words.length;
      const targetWord = words[nextIndex];
      let iteration = 0;

      const scrambleInterval = setInterval(() => {
        setDisplayText(
          targetWord
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return targetWord[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iteration >= targetWord.length) {
          clearInterval(scrambleInterval);
          setCurrentIndex(nextIndex);
          setIsScrambling(false);
        }

        iteration += 1 / 2;
      }, 35);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, words, interval]);

  return (
    <span className={`font-mono inline-block ${isScrambling ? 'text-[#00E5FF]' : ''} ${className}`}>
      {displayText}
      <span className="inline-block w-2.5 h-5 ml-1 bg-[#00E5FF] animate-pulse align-middle" />
    </span>
  );
};
