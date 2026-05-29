import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveProjectButton, AppStoreButton, PlayStoreButton } from '../Button/Button';
import './ProjectCard.css';

export const ProjectCard = ({ project, index, total }) => {
  const cardRef = useRef(null);
  
  // Track scroll position of individual card in viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start']
  });

  // Calculate target scale: older cards scale down slightly as newer stack on top
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky h-auto md:h-[85vh] w-full project-card-container"
      style={{ top: `${96 + index * 28}px` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-full w-full flex flex-col gap-4 sm:gap-6 md:gap-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 project-card-body"
      >
        {/* Category, Name, Live Link Button */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex flex-row items-start gap-3 sm:gap-6 md:gap-10 min-w-0 w-full">
            <span
              className="shrink-0 font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1 sm:gap-3 pt-1 sm:pt-3 md:pt-4 min-w-0 flex-1">
              <span
                className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
                style={{ fontSize: 'clamp(0.65rem, 1.2vw, 1rem)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-2 md:pt-3 w-full sm:w-auto flex flex-wrap items-center gap-3">
            {project.liveUrl && <LiveProjectButton href={project.liveUrl} className="w-full sm:w-auto" />}
            {project.appStoreUrl && <AppStoreButton href={project.appStoreUrl} className="w-full sm:w-auto" />}
            {project.playStoreUrl && <PlayStoreButton href={project.playStoreUrl} className="w-full sm:w-auto" />}
          </div>
        </div>

        {/* Dynamic Image Grid Layout */}
        <div className="project-images-grid">
          <div className="project-images-left">
            <div className="project-img-wrapper img-left-1">
              <img
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                className="project-img"
                loading="lazy"
                draggable="false"
              />
            </div>
            <div className="project-img-wrapper img-left-2">
              <img
                src={project.col1Image2}
                alt={`${project.name} preview 2`}
                className="project-img"
                loading="lazy"
                draggable="false"
              />
            </div>
          </div>
          <div className="project-img-wrapper project-images-right">
            <img
              src={project.col2Image}
              alt={`${project.name} preview 3`}
              className="project-img"
              loading="lazy"
              draggable="false"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default ProjectCard;
