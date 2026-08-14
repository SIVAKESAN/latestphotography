'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Layers, LayoutGrid } from 'lucide-react';
import { sampleImages } from '@/config/sampleImages';

export default function DesignShowcase() {
  return (
    <section className="py-24 md:py-32 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold">
              05 // SECONDARY DISCIPLINE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 uppercase tracking-tight mt-1.5">
              Visual Design
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal max-w-lg">
              Practised since Grade 10. Combining geometric discipline, editorial layout, and brand strategy.
            </p>
          </div>
          <Link
            href="/work/design"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            <span>VIEW DESIGN ARCHIVE</span>
            <ArrowUpRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Structured 2-Column Design Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* 1. Logo Design Card (Process-driven) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group bg-white border border-slate-200 hover:border-slate-300 rounded-lg shadow-xs hover:shadow-md transition-all p-7 md:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-blue-600">
                  <Layers className="w-4 h-4" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider">7-Stage Process</span>
                </div>
                <span className="text-xs font-mono text-slate-500 font-medium">BRAND IDENTITY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-5 group-hover:text-blue-600 transition-colors">
                Logo & Brandmark Identity
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2 leading-relaxed">
                Strategic brand design structured across Briefing, Research, Concept Sketches, Vector Exploration, Refinement, and Real-world Touchpoints.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/work/design/story/lumina-visual-identity" className="block relative aspect-[16/10] overflow-hidden rounded-md bg-slate-100 border border-slate-200 shadow-xs">
                <Image
                  src={sampleImages.design.logoProject.cover}
                  alt="Logo Design Process Case Study"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="text-white font-medium drop-shadow-sm">Aura Identity Case Study</span>
                  <span className="text-blue-300 flex items-center gap-1 uppercase tracking-wider text-[11px] font-semibold">
                    Read Case Study →
                  </span>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* 2. Poster Design Card (Multi-format) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group bg-white border border-slate-200 hover:border-slate-300 rounded-lg shadow-xs hover:shadow-md transition-all p-7 md:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-blue-600">
                  <LayoutGrid className="w-4 h-4" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider">Multi-Format Systems</span>
                </div>
                <span className="text-xs font-mono text-slate-500 font-medium">KEY VISUALS</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-5 group-hover:text-blue-600 transition-colors">
                Sports & Event Posters
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2 leading-relaxed">
                Dynamic, typographic key visuals for championship tournaments, matches, and cultural festivals with Instagram (4:5) and Story (9:16) adaptations.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/work/design/story/northern-derby-matchday-poster" className="block relative aspect-[16/10] overflow-hidden rounded-md bg-slate-100 border border-slate-200 shadow-xs">
                <Image
                  src={sampleImages.design.posterProject1.main}
                  alt="Poster Design Showcase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="text-white font-medium drop-shadow-sm">Northern Championship Poster</span>
                  <span className="text-blue-300 flex items-center gap-1 uppercase tracking-wider text-[11px] font-semibold">
                    View Formats →
                  </span>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
