import React from 'react';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Services from '../../components/Services/Services';
import Interactive3D from '../../components/Interactive3D/Interactive3D';
import Projects from '../../components/Projects/Projects';
import ParticleHero from '../../components/ui/particle-hero';
import Contact from '../../components/Contact/Contact';
import './Home.css';

export const Home = () => {
  return (
    <main className="relative w-full home-main-wrapper">
      <Hero />
      <About />
      <Services />
      <Interactive3D />
      <Projects />
      <ParticleHero />
      <Contact />
    </main>
  );
};

export default Home;
