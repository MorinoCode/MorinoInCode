import React from 'react';
import Reveal from '../Reveal/Reveal';
import TextReveal from '../TextReveal/TextReveal';
import { ContactButton } from '../Button/Button';
import './About.css';

// Import local images for about me section
import aboutPic1 from '../../assets/aboutme/aboutmePic (1).png';
import aboutPic2 from '../../assets/aboutme/aboutmePic (3).png';
import aboutPic3 from '../../assets/aboutme/aboutmePic (2).png';
import aboutPic4 from '../../assets/aboutme/aboutmePic (4).png';

const ABOUT_TEXT = "I'm a Full-Stack Developer & Designer. I focus on UI/UX, full-stack development, and GenAI integration — turning rough ideas into clean, performant, and engaging digital experiences. Let's build something incredible together!";

const SKILL_CATEGORIES = [
  { label: 'Languages', items: ['JavaScript', 'HTML', 'CSS', 'SQL'] },
  { label: 'Frameworks & Libraries', items: ['React', 'Tailwind', 'Bootstrap'] },
  { label: 'Tools & Platforms', items: ['Vercel', 'Git', 'GitHub', 'Render', 'Canva', 'Excel'] },
  { label: 'AI & GenAI', items: ['Gemini', 'Claude', 'OpenAI', 'Prompt engineering'] }
];

export const About = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C]"
    >
      {/* Floating 3D graphics */}
      <Reveal
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[60px] sm:w-[160px] md:w-[210px] about-floating-img"
      >
        <img
          src={aboutPic1}
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable="false"
        />
      </Reveal>

      <Reveal
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[55px] sm:w-[140px] md:w-[180px] about-floating-img"
      >
        <img
          src={aboutPic2}
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable="false"
        />
      </Reveal>

      <Reveal
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[60px] sm:w-[160px] md:w-[210px] about-floating-img"
      >
        <img
          src={aboutPic3}
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable="false"
        />
      </Reveal>

      <Reveal
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[65px] sm:w-[170px] md:w-[220px] about-floating-img"
      >
        <img
          src={aboutPic4}
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable="false"
        />
      </Reveal>

      {/* Main content layout */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 text-center">
        <Reveal delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </Reveal>

        <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20">
          <TextReveal
            text={ABOUT_TEXT}
            className="font-medium leading-relaxed text-[#D7E2EA] max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />

          <Reveal delay={0.15} className="w-full max-w-3xl">
            <div className="flex flex-col gap-5 sm:gap-6">
              {SKILL_CATEGORIES.map((category) => (
                <div
                  key={category.label}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5"
                >
                  <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 sm:w-44 sm:shrink-0 sm:text-right">
                    {category.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] px-3 py-1 text-sm text-[#D7E2EA]/80 hover:border-[#D7E2EA]/40 hover:text-[#D7E2EA] transition-colors duration-200 cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <ContactButton label="Contact Me" href="#contact" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
