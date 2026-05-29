import React from 'react';
import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import Reveal from '../Reveal/Reveal';
import { ShaderAnimation } from '../ui/shader-animation';
import './Contact.css';

const Linkedin = ({ className, size, strokeWidth }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Github = ({ className, size, strokeWidth }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const CONTACTS_DATA = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mr.rasti69@gmail.com',
    href: 'mailto:mr.rasti69@gmail.com'
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '0737202595',
    href: 'https://wa.me/46737202595'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/morteza-rasti-8869b41a4',
    href: 'https://www.linkedin.com/in/morteza-rasti-8869b41a4'
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@MorinoCode',
    href: 'https://github.com/MorinoCode'
  }
];

export const Contact = () => {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 overflow-hidden"
    >
      {/* Shader Background Animation */}
      <div className="contact-shader-bg">
        <ShaderAnimation />
      </div>

      <div className="relative z-10 w-full h-full">
        <Reveal y={40}>
          <h2
            className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Get in touch
          </h2>
        </Reveal>

        <Reveal delay={0.15} y={20}>
          <p
            className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/60 mb-12 sm:mb-16 md:mb-20"
            style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
          >
            Pick whichever channel suits you
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {CONTACTS_DATA.map((contact, index) => {
            const Icon = contact.icon;
            const isExternal = contact.href.startsWith('http');
            return (
              <Reveal key={contact.label} delay={index * 0.1} y={30}>
                <a
                  href={contact.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group relative flex h-full flex-col justify-between gap-8 sm:gap-10 rounded-[28px] sm:rounded-[32px] border-2 border-[#D7E2EA]/20 bg-[#141418] p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-[#D7E2EA]/60 hover:bg-[#1a1a20] hover:-translate-y-1 contact-card"
                >
                  <div className="flex items-start justify-between">
                    <div className="rounded-full border border-[#D7E2EA]/20 p-3 sm:p-3.5 transition-colors duration-300 group-hover:border-[#D7E2EA]/50">
                      <Icon className="text-[#D7E2EA]" size={22} strokeWidth={1.5} />
                    </div>
                    <ArrowUpRight
                      className="text-[#D7E2EA]/40 transition-all duration-300 group-hover:text-[#D7E2EA] group-hover:rotate-12"
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <span
                      className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
                      style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
                    >
                      {contact.label}
                    </span>
                    <span
                      className="font-medium text-[#D7E2EA] break-all"
                      style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}
                    >
                      {contact.value}
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.4} y={20}>
          <p className="text-center text-[10px] sm:text-xs font-light uppercase tracking-[0.25em] text-[#D7E2EA]/45 mt-20 sm:mt-24 md:mt-28">
            © 2026 Morteza Rasti. All rights reserved.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
