import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../Reveal/Reveal';
import uiuxIcon from '../../assets/uiuxdesign.jpg';
import fullstackIcon from '../../assets/fullstackdevelper.jpg';
import mobileIcon from '../../assets/mobileapp.jpg';
import './Services.css';

const SERVICES_DATA = [
  {
    number: '01',
    title: 'UI/UX Design',
    description: 'Designing clean, intuitive interfaces that prioritise user flow, hierarchy, and visual clarity — turning ideas into experiences people actually enjoy using.',
    hueA: 260,
    hueB: 300,
    icon: uiuxIcon
  },
  {
    number: '02',
    title: 'Full-Stack Dev',
    description: 'Building robust, performant web applications with modern frontend frameworks, backends, and databases — scaled and deployed seamlessly.',
    hueA: 340,
    hueB: 15,
    icon: fullstackIcon
  },
  {
    number: '03',
    title: 'Mobile Apps',
    description: 'Building full-featured, cross-platform mobile applications for iOS and Android using React Native — creating seamless, native experiences with optimal performance.',
    hueA: 190,
    hueB: 230,
    icon: mobileIcon
  }
];

const hue = (h) => `hsl(${h}, 100%, 50%)`;

const cardVariants = {
  offscreen: {
    y: 280,
    rotate: 0
  },
  onscreen: (index) => ({
    y: 35,
    rotate: index === 0 ? -6 : index === 2 ? 6 : 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.85,
      delay: index * 0.15
    }
  })
};

export const Services = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1080);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="services"
      className="relative w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 pb-32 sm:pb-48 md:pb-64 overflow-hidden"
    >
      <Reveal delay={0} y={40}>
        <h2
          className="text-center font-black uppercase text-[#0C0C0C] mb-12 sm:mb-16 md:mb-20 leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </Reveal>

      <div className="services-stack-container">
        {SERVICES_DATA.map((service, index) => {
          return (
            <motion.div
              key={service.number}
              className={`services-card-wrapper wrapper-${index}`}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: false, amount: 0.35 }}
            >
              {/* Responsive SVG Splash Background */}
              <div className="services-card-splash">
                <svg
                  viewBox="0 0 500 450"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                >
                  <path
                    d="M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z"
                    fill={`url(#gradient-${index})`}
                  />
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={hue(service.hueA)} />
                      <stop offset="100%" stopColor={hue(service.hueB)} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              {/* Stacking Card */}
              <motion.div 
                className="services-stack-card"
                variants={cardVariants}
                custom={index}
                whileHover={!isMobile ? {
                  y: 10,
                  scale: 1.04,
                  rotate: 0,
                  zIndex: 10,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                } : undefined}
              >
                <div className="services-card-header">
                  <span className="services-card-number">{service.number}</span>
                  <h3 className="services-card-title-mini">{service.title}</h3>
                </div>

                <div className="services-card-image-box">
                  <img 
                    src={service.icon} 
                    alt={service.title} 
                    className="services-card-img"
                    loading="lazy"
                  />
                </div>
                
                <div className="services-card-body">
                  <p className="services-card-desc">{service.description}</p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
