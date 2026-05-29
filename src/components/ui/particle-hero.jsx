import React, { useEffect, useRef, useState } from "react";
import './particle-hero.css';

export function ParticleHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isGoldMode, setIsGoldMode] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const particlesRef = useRef([]);
  const animationRef = useRef();

  const createParticle = (canvas) => {
    const particle = {
      x: 0,
      y: 0,
      speed: 0,
      opacity: 1,
      fadeDelay: 0,
      fadeStart: 0,
      fadingOut: false,
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      },
      update() {
        this.y -= this.speed;
        if (this.y < 0) {
          this.reset();
        }

        if (!this.fadingOut && Date.now() > this.fadeStart) {
          this.fadingOut = true;
        }

        if (this.fadingOut) {
          this.opacity -= 0.008;
          if (this.opacity <= 0) {
            this.reset();
          }
        }
      },
      draw(ctx) {
        ctx.fillStyle = `rgba(${255 - (Math.random() * 255) / 2}, 255, 255, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1);
      },
    };

    particle.reset();
    particle.y = Math.random() * canvas.height;
    particle.fadeDelay = Math.random() * 600 + 100;
    particle.fadeStart = Date.now() + particle.fadeDelay;
    particle.fadingOut = false;

    return particle;
  };

  const calculateParticleCount = (canvas) => {
    return Math.floor((canvas.width * canvas.height) / 6000);
  };

  const initParticles = (canvas) => {
    const particleCount = calculateParticleCount(canvas);
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas));
    }
  };

  const animate = (canvas, ctx) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef.current.forEach((particle) => {
      particle.update();
      particle.draw(ctx);
    });
    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx));
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(canvas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initParticles(canvas);
    animate(canvas, ctx);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (hasClicked) {
      setShowHint(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasClicked) {
          const timer = setTimeout(() => {
            setShowHint(true);
          }, 1500); // Appear 1.5s after section becomes visible
          return () => clearTimeout(timer);
        } else {
          setShowHint(false);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [hasClicked]);

  const toggleGoldMode = () => {
    setIsGoldMode(!isGoldMode);
    setHasClicked(true);
    setShowHint(false);
  };

  return (
    <div
      ref={containerRef}
      className={`particle-hero-wrapper relative w-full overflow-hidden ${isGoldMode ? "gold-mode" : ""}`}
      style={{ 
        background: "#000000",
        fontSize: "max(calc(min(600px, 80vh) * 0.03), 10px)",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        scrollBehavior: "smooth",
      }}
    >
      {/* Header */}
      <div
        className="header"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          color: "#bad6f7",
          padding: "2em",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          margin: "0 auto",
          opacity: 0,
          transform: "translateY(-1em)",
          animation: "load 2s ease-in 2s forwards, up 1.4s ease-out 2s forwards",
        }}
      >
        <div
          className="mid-spot"
          onClick={toggleGoldMode}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            margin: "0 auto",
            width: "1.8em",
            height: "1.8em",
            borderRadius: "50%",
            background: "black",
            boxShadow: "0 0 1em 0 #98c0ef",
            cursor: "pointer",
            transition: "box-shadow 1s ease-in-out",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = isGoldMode
              ? "-0.3em 0.1em 0.2em 0 #98c0ef"
              : "-0.3em 0.1em 0.2em 0 #d8bd10"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = isGoldMode ? "0 0 1em 0 #d8bd10" : "0 0 1em 0 #98c0ef"
          }}
        />

        {/* Click hint tooltip */}
        <div className={`sun-hint ${showHint ? 'show' : ''}`}>
          Click me! ✦
        </div>

        <div
          className="spotlight"
          style={{
            pointerEvents: "none",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            margin: "0 auto",
            transition: "filter 1s ease-in-out",
            height: "42em",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                borderRadius: "0 0 50% 50%",
                position: "absolute",
                left: 0,
                right: 0,
                margin: "0 auto",
                top: "3em",
                width: "30em",
                height: "max(42em, 86vh)",
                backgroundImage:
                  "conic-gradient(from 0deg at 50% -5%, transparent 45%, rgba(124, 145, 182, .3) 49%, rgba(124, 145, 182, .5) 50%, rgba(124, 145, 182, .3) 51%, transparent 55%)",
                transformOrigin: "50% 0",
                filter: "blur(15px) opacity(0.5)",
                zIndex: -1,
                transform: i === 0 ? "rotate(20deg)" : i === 1 ? "rotate(-20deg)" : "rotate(0deg)",
                animation:
                  i === 0
                    ? "load 2s ease-in-out forwards, loadrot 2s ease-in-out forwards, spotlight 17s ease-in-out infinite"
                    : i === 1
                      ? "load 2s ease-in-out forwards, loadrot 2s ease-in-out forwards, spotlight 14s ease-in-out infinite"
                      : "load 2s ease-in-out forwards, loadrot 2s ease-in-out forwards, spotlight 21s ease-in-out infinite reverse",
              }}
            />
          ))}
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        id="particleCanvas"
        style={{
          position: "absolute",
          pointerEvents: "none",
          animation: "load 0.4s ease-in-out forwards",
          zIndex: 1,
          width: "100%",
          height: "100%"
        }}
      />



      {/* Hero */}
      <div
        className="hero"
      >
        <div
          className="heroT"
          style={{
            position: "relative",
            width: "100%",
            height: "7rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0,
            animation: "load 2s ease-in-out 0.6s forwards",
          }}
        >
          <h2
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              width: "100%",
              margin: "0 auto",
              fontSize: "clamp(2rem, 5vw, 4.2rem)",
              fontWeight: 600,
              color: "#9dc3f7",
              background: `
                radial-gradient(2em 2em at 50% 50%,
                  transparent calc(var(--p, 0%) - 2em),
                  #fff calc(var(--p, 0%) - 1em), 
                  #fff calc(var(--p, 0%) - 0.4em), 
                  transparent var(--p, 0%) 
                ),
                linear-gradient(0deg, #bad1f1 30%, #9dc3f7 100%)
              `,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 16px rgba(174,207,242,.24)",
              transition: "--p 3s linear",
              animation: "pulse 10s linear 1.2s infinite",
              textAlign: "center"
            }}
          >
            Build Your Dream App or Website
          </h2>
          <h2
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              width: "100%",
              margin: "0 auto",
              fontSize: "clamp(2rem, 5vw, 4.2rem)",
              fontWeight: 600,
              background: `
                radial-gradient(2em 2em at 50% 50%,
                  transparent calc(var(--p, 0%) - 2em),
                  transparent calc(var(--p, 0%) - 1em),
                  #fff calc(var(--p, 0%) - 1em), 
                  #fff calc(var(--p, 0%) - 0.4em), 
                  transparent calc(var(--p, 0%) - 0.4em), 
                  transparent var(--p, 0%) 
                )
              `,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "blur(16px) opacity(0.4)",
              textAlign: "center"
            }}
          >
            Build Your Dream App or Website
          </h2>
        </div>

        {/* Hero P */}
        <p
          className="heroP"
          style={{
            fontSize: "1.35em",
            marginTop: "1.5rem",
            width: "100%",
            maxWidth: "48rem",
            opacity: 0,
            transform: "translateY(1em)",
            animation: "load 2s ease-out 2s forwards, up 1.4s ease-out 2s forwards",
            color: "#d8ecf8", 
            background: "linear-gradient(0deg, #d8ecf8 0, #98c0ef 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1.5",
            textAlign: "center"
          }}
        >
          You wish it, I build it — custom apps, stunning websites, and advanced digital solutions crafted to bring your vision to life.
        </p>
      </div>
    </div>
  );
}

export default ParticleHero;
