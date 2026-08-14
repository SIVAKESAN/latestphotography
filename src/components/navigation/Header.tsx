'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FullscreenMenu from './FullscreenMenu';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On admin pages, let the admin layout handle navigation
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-200/80 shadow-xs'
            : 'bg-white/70 backdrop-blur-xs py-5 md:py-6 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link
            href="/"
            className="group flex flex-col items-start"
            aria-label="LATEST PHOTOGRAPHY Home"
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
              LATEST PHOTOGRAPHY
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-slate-500 group-hover:text-slate-700 transition-colors hidden sm:block font-normal">
              Jaffna · Sri Lanka
            </span>
          </Link>

          {/* Minimal Menu Trigger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="group flex items-center gap-3 py-1.5 px-3.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-200"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
              MENU
            </span>
            <div className="w-5 h-5 flex flex-col justify-center items-end gap-1.5">
              <span className="w-4.5 h-[1.75px] bg-slate-800 group-hover:bg-blue-600 transition-colors duration-200" />
              <span className="w-3 h-[1.75px] bg-slate-800 group-hover:w-4.5 group-hover:bg-blue-600 transition-all duration-200" />
            </div>
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
