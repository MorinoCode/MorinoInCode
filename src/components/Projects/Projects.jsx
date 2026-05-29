import React, { useRef } from 'react';
import Reveal from '../Reveal/Reveal';
import ProjectCard from './ProjectCard';
import unlockImage1 from '../../assets/projects/project1/1.png';
import unlockImage2 from '../../assets/projects/project1/2.png';
import unlockImage3 from '../../assets/projects/project1/3.jpg';
import alarfajImage1 from '../../assets/projects/project2/1.png';
import alarfajImage2 from '../../assets/projects/project2/2.png';
import alarfajImage3 from '../../assets/projects/project2/3.png';
import kuwaitqiratImage1 from '../../assets/projects/project3/1.png';
import kuwaitqiratImage2 from '../../assets/projects/project3/2.png';
import kuwaitqiratImage3 from '../../assets/projects/project3/3.png';
import ffstechImage1 from '../../assets/projects/project4/1.png';
import ffstechImage2 from '../../assets/projects/project4/2.png';
import ffstechImage3 from '../../assets/projects/project4/3.png';
import './Projects.css';

const PROJECTS_DATA = [
  {
    number: '01',
    category: 'Product · Dating App',
    name: 'Unlock Me',
    liveUrl: 'https://unlock-me.app/',
    appStoreUrl: 'https://apps.apple.com/ca/app/unlock-me-dating-chat/id6760195559',
    playStoreUrl: 'https://apps.apple.com/ca/app/unlock-me-dating-chat/id6760195559',
    col1Image1: unlockImage1,
    col1Image2: unlockImage2,
    col2Image: unlockImage3
  },
  {
    number: '02',
    category: 'Product · Game & Education',
    name: 'Alarfaj',
    liveUrl: 'https://alarfaj-frontend.vercel.app/',
    appStoreUrl: 'https://apps.apple.com/se/app/alarfajkw/id6762461063',
    col1Image1: alarfajImage1,
    col1Image2: alarfajImage2,
    col2Image: alarfajImage3
  },
  {
    number: '03',
    category: 'Product · Inventory & Store Manager',
    name: 'Kuwaitqirat',
    liveUrl: 'https://k-qirat-ai-frontend.vercel.app/',
    col1Image1: kuwaitqiratImage1,
    col1Image2: kuwaitqiratImage2,
    col2Image: kuwaitqiratImage3
  },
  {
    number: '04',
    category: 'Product · Security Company Site',
    name: 'FFSTECH',
    liveUrl: 'https://ffstech.vercel.app/',
    col1Image1: ffstechImage1,
    col1Image2: ffstechImage2,
    col2Image: ffstechImage3
  }
];

export const Projects = () => {
  const containerRef = useRef(null);

  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <Reveal y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </Reveal>

      <div ref={containerRef} className="mx-auto max-w-7xl">
        {PROJECTS_DATA.map((project, idx) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={idx}
            total={PROJECTS_DATA.length}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
