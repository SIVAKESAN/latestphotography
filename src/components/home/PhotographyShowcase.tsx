'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { sampleImages } from '@/config/sampleImages';

const photographyCategories = [
  {
    title: "Graduation",
    slug: "graduation",
    count: "25+ Stories",
    image: sampleImages.photography.graduation[1],
    description: "University convocation milestones, academic triumphs, and joyful portraits.",
  },
  {
    title: "Events",
    slug: "events",
    count: "20+ Stories",
    image: sampleImages.photography.events[1],
    description: "Atmospheric evening gatherings, cultural celebrations, and candid moments.",
  },
  {
    title: "Portrait",
    slug: "portrait",
    count: "18+ Stories",
    image: sampleImages.photography.portrait[1],
    description: "Evocative character-driven editorial portraits in natural ambient lighting.",
  },
  {
    title: "Kovil Events",
    slug: "kovil-events",
    count: "14+ Stories",
    image: sampleImages.photography.kovilEvents[1],
    description: "Devotional vibrancy, temple poojas, and sacred South Asian traditions.",
  },
  {
    title: "Sports",
    slug: "sports",
    count: "12+ Stories",
    image: sampleImages.photography.sports[1],
    description: "High-intensity athletic pursuits and frozen decisive game moments.",
  },
];

export default function PhotographyShowcase() {
  return (
    <section className="py-24 md:py-32 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold">
            04 // CORE PRACTICE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 uppercase tracking-tight mt-1.5">
            Photography Disciplines
          </h2>
          <p className="mt-3 text-sm text-slate-600 font-normal max-w-xl">
            Photography is the primary focus of LATEST PHOTOGRAPHY. Each discipline is approached with cinematic patience and respect for natural light.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {photographyCategories.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Link
                href={`/work/photography/${cat.slug}`}
                className="group block relative overflow-hidden bg-slate-100 border border-slate-200 hover:border-blue-400 rounded-lg shadow-xs hover:shadow-md transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-slate-800 bg-white/95 px-2.5 py-1 rounded shadow-xs">
                        {cat.count}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-200 font-normal mt-1.5 line-clamp-2">
                        {cat.description}
                      </p>
                      
                      <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-blue-300 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>EXPLORE ARCHIVE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
