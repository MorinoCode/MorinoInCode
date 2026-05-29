import React, { useRef, useState, useEffect } from 'react';
import Reveal from '../Reveal/Reveal';
import introVideo from '../../assets/mortezaportfolo.mp4';
import './Hero.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

export const Hero = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [showSoundTip, setShowSoundTip] = useState(true);

  useEffect(() => {
    const tipTimer = setTimeout(() => setShowSoundTip(false), 5000);
    return () => clearTimeout(tipTimer);
  }, []);

  // Mute video automatically if scrolled out of view by 50%
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const video = videoRef.current;
          if (video && !video.muted) {
            video.muted = true;
            setMuted(true);
          }
        }
      },
      {
        threshold: 0,
        rootMargin: '-50% 0px 0px 0px'
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
      observer.disconnect();
    };
  }, []);

  // Handle auto scroll-down on wheel/keydown when near top
  useEffect(() => {
    let scrolled = false;

    const doScroll = () => {
      if (scrolled) return;
      scrolled = true;
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };

    const handleWheel = (e) => {
      if (scrolled || e.deltaY <= 0 || window.scrollY > 50) return;
      e.preventDefault();
      doScroll();
    };

    const handleKeyDown = (e) => {
      if (scrolled || window.scrollY > 50) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        doScroll();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setMuted(video.muted);
      setShowSoundTip(false);
    }
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
    }
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover hero-video-scale"
      >
        <source src={introVideo} type="video/mp4" />
      </video>

      {/* Gradients to darken background for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Navigation Bar */}
        <Reveal delay={0} y={-20} className="relative">
          <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
            <ul className="flex items-center gap-5 sm:gap-8 md:gap-12">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-[1.03]"
            >
              Email me
            </a>
          </div>
        </Reveal>

        {/* Hero Title */}
        <div className="flex flex-1 items-end pb-28 sm:pb-32 md:items-center md:pb-0">
          <div className="w-full max-w-7xl px-6 md:px-10">
            <Reveal delay={0.3} y={20}>
              <p className="mb-4 text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-white/60">
                Portfolio · 2026
              </p>
            </Reveal>
            <Reveal delay={0.5} y={40}>
              <h1
                className="font-black uppercase leading-[0.88] tracking-tight text-white hero-title-name"
              >
                Morteza
              </h1>
            </Reveal>
            <Reveal delay={0.85} y={20}>
              <p className="mt-5 md:mt-7 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-white/75">
                Full-Stack Developer · Designer · GenAI Integration
              </p>
            </Reveal>
          </div>
        </div>

        {/* Scroll Indicator & Audio Toggle */}
        <div className="flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-10 md:pb-12">
          {/* Scroll Down */}
          <Reveal delay={1.1} y={20}>
            <a
              href="#about"
              aria-label="Scroll to next section"
              className="group flex flex-col items-center gap-3"
            >
              <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.35em] text-white/77 transition group-hover:text-white">
                Scroll
              </span>
              <div className="relative h-12 w-px overflow-hidden bg-white/20">
                <span className="absolute inset-x-0 top-0 h-1/2 w-full bg-white scroll-line-indicator" />
              </div>
            </a>
          </Reveal>

          {/* Sound & Replay controls */}
          <Reveal delay={1.1} y={20}>
            <div className="flex items-center gap-3">
              {showSoundTip && (
                <span className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.25em] text-white/80 sound-tip-pulse">
                  Tap for sound
                </span>
              )}
              {/* Replay Button */}
              <button
                onClick={handleReplay}
                aria-label="Replay video"
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-110"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              {/* Sound Toggle Button */}
              <button
                onClick={toggleMute}
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-110"
              >
                {muted ? (
                  /* Mute Icon (Speaker with X) */
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  /* Unmute Icon (Speaker with waves) */
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
