import React from 'react';
import './Button.css';
import appleLogo from '../../assets/logo/apple.png';
import googleLogo from '../../assets/logo/google.png';

export const ContactButton = ({
  label = 'Contact Me',
  href = '#contact',
  onClick,
  className = ''
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`custom-contact-btn inline-flex items-center justify-center rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white whitespace-nowrap transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {label}
    </a>
  );
};

export const LiveProjectButton = ({
  label = 'Live Project',
  href = '#',
  className = ''
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] whitespace-nowrap transition-colors duration-200 hover:bg-[#D7E2EA]/10 ${className}`}
    >
      {label}
    </a>
  );
};

export const AppStoreButton = ({
  href = '#',
  className = ''
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`store-download-btn ${className}`}
      title="Download on the App Store"
    >
      <img
        src={appleLogo}
        alt="App Store"
        className="store-btn-logo"
        draggable="false"
      />
    </a>
  );
};

export const PlayStoreButton = ({
  href = '#',
  className = ''
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`store-download-btn ${className}`}
      title="Get it on Google Play"
    >
      <img
        src={googleLogo}
        alt="Google Play"
        className="store-btn-logo"
        draggable="false"
      />
    </a>
  );
};

