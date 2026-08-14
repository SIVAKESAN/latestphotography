'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { sampleImages } from '@/config/sampleImages';
import { siteSettings } from '@/config/siteContent';

export default function Hero() {
  const scrollToExplore = () => {
    const el = document.getElementById('brand-statement');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 select-none">
      {/* Background Cinematic Image */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={sampleImages.hero}
          alt="LATEST PHOTOGRAPHY — Graduation and Cinematic Storytelling"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-90 contrast-105"
        />

        {/* Crisp Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/60" />
      </motion.div>

      {/* Hero Typography & Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Subtle Brand Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-white font-semibold font-sans">
            {siteSettings.brandName}
          </span>
        </motion.div>

        {/* Large Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl drop-shadow-sm"
        >
          Capturing Moments, <br className="hidden sm:inline" />
          <span className="text-blue-300 font-normal">Creating Identity.</span>
        </motion.h1>

        {/* Sub-statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-xs sm:text-sm uppercase tracking-[0.2em] text-slate-200 font-medium max-w-lg leading-relaxed"
        >
          Cinematic Photography & Visual Design
          <span className="block mt-1 text-blue-200 text-[11px] tracking-[0.15em] font-normal">
            Jaffna · Northern Province · Colombo
          </span>
        </motion.p>

        {/* Primary CTA Trigger: EXPLORE WORK ↓ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 md:mt-14"
        >
          <button
            onClick={scrollToExplore}
            aria-label="Explore Photography & Design Work"
            className="group flex flex-col items-center gap-2.5 text-xs uppercase tracking-[0.2em] font-semibold text-white/90 hover:text-white transition-colors duration-200"
          >
            <span>EXPLORE WORK</span>
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 group-hover:border-white group-hover:bg-white/30 flex items-center justify-center transition-all duration-200 group-hover:translate-y-1 shadow-md">
              <ArrowDown className="w-4 h-4 text-white" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Coordinates / Meta */}
      <div className="absolute bottom-6 left-6 md:left-12 hidden md:block text-[10px] font-mono text-white/70 tracking-widest uppercase">
        LAT 9.6615° N // LON 80.0255° E
      </div>
      <div className="absolute bottom-6 right-6 md:right-12 hidden md:block text-[10px] font-mono text-white/70 tracking-widest uppercase">
        ARCHIVE VOL. 2026
      </div>
    </section>
  );
}
