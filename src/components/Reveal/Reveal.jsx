import React from 'react';
import { motion } from 'framer-motion';
import './Reveal.css';

export const Reveal = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className = '',
  style = {}
}) => {
  // Map standard HTML tag names to motion components
  const Component = motion[as] || motion.div;

  return (
    <Component
      initial={{ opacity: 0, x: x, y: y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        delay: delay,
        duration: duration,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
};

export default Reveal;
