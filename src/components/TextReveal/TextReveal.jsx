import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './TextReveal.css';

const Character = ({ char, index, total, progress }) => {
  const start = index / total;
  const end = start + 1 / total;
  // Character fades from 20% opacity (subtle guide text) to 100% full white as user scrolls
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="text-reveal-char-wrapper">
      <span className="text-reveal-char-bg">{char}</span>
      <motion.span
        style={{ opacity }}
        className="text-reveal-char-fg"
        aria-hidden="true"
      >
        {char}
      </motion.span>
    </span>
  );
};

export const TextReveal = ({ text, className = '', style = {} }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const words = text.split(' ');
  const totalLength = text.length;
  let charIndexCounter = 0;

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, wordIdx) => {
        const chars = Array.from(word);
        const currentWordStartIdx = charIndexCounter;
        charIndexCounter += chars.length + 1; // Increment for word characters and the space

        return (
          <span key={wordIdx} className="text-reveal-word">
            {chars.map((char, charIdx) => (
              <Character
                key={charIdx}
                char={char}
                index={currentWordStartIdx + charIdx}
                total={totalLength}
                progress={scrollYProgress}
              />
            ))}
            {wordIdx < words.length - 1 && '\u00A0'}
          </span>
        );
      })}
    </p>
  );
};

export default TextReveal;
