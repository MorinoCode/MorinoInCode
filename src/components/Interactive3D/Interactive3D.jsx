import React, { useRef, useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import Reveal from '../Reveal/Reveal';
import './Interactive3D.css';

const Spline = lazy(() => import('@splinetool/react-spline'));

export const Interactive3D = () => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Springs for mouse-following spotlight
  const mouseX = useSpring(0, { bounce: 0 });
  const mouseY = useSpring(0, { bounce: 0 });

  // Transforms to offset the circular spotlight centered on the mouse position
  const size = 320; // Spotlight size
  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  const handleMouseMove = useCallback((event) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const parent = cardRef.current;
    if (!parent) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove]);

  return (
    <section className="interactive-3d-section">
      <Reveal delay={0} y={30} className="w-full">
        <div
          ref={cardRef}
          className="interactive-3d-card"
        >
          {/* Ambient Background Grid */}
          <div className="interactive-3d-grid" />

          {/* Aceternity static glow spotlight (top-left) */}
          <svg
            className="static-spotlight animate-spotlight-glow"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3787 2842"
            fill="none"
          >
            <g filter="url(#spotlight-filter)">
              <ellipse
                cx="1924.71"
                cy="273.501"
                rx="1924.71"
                ry="273.501"
                transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                fill="white"
                fillOpacity="0.12"
              />
            </g>
            <defs>
              <filter
                id="spotlight-filter"
                x="0.860352"
                y="0.838989"
                width="3785.16"
                height="2840.26"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
              </filter>
            </defs>
          </svg>

          {/* Dynamic mouse-following spotlight */}
          <motion.div
            className="mouse-spotlight"
            style={{
              width: size,
              height: size,
              left: spotlightLeft,
              top: spotlightTop,
              opacity: isHovered ? 1 : 0
            }}
          />

          <div className="interactive-3d-layout">
            {/* Left content */}
            <div className="interactive-3d-content">
              <h3 className="interactive-3d-title">
                Bringing Code to Life
              </h3>
              <p className="interactive-3d-desc">
                I combine full-stack engineering with interactive 3D elements to build immersive web experiences. Drag and hover over the scene to explore how I blend design, creativity, and clean code.
              </p>
            </div>

            {/* Right content (Spline Scene) */}
            <div className="interactive-3d-scene-container">
              <Suspense
                fallback={
                  <div className="spline-loader-container">
                    <span className="spline-loader"></span>
                  </div>
                }
              >
                <Spline
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="spline-canvas"
                />
              </Suspense>
            </div>
          </div>

        </div>
      </Reveal>
    </section>
  );
};

export default Interactive3D;
