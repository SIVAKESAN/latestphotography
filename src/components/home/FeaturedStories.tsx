'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';

interface FeaturedStoriesProps {
  projects: Project[];
}

export default function FeaturedStories({ projects }: FeaturedStoriesProps) {
  // Ensure we show 6 curated featured projects
  const displayProjects = projects.slice(0, 6);

  return (
    <section className="py-24 md:py-32 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold">
              03 // SELECTED ARCHIVE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 uppercase tracking-tight mt-1.5">
              Featured Stories
            </h2>
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            <span>VIEW ALL WORKS</span>
            <ArrowUpRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {displayProjects.map((project, idx) => {
            const isLarge = idx === 0 || idx === 3;
            const colSpan = isLarge ? "md:col-span-8" : "md:col-span-4";
            const aspectClass = isLarge ? "aspect-[16/10]" : "aspect-[4/5]";
            const targetUrl = project.type === 'photography' 
              ? `/work/photography/story/${project.slug}`
              : `/work/design/story/${project.slug}`;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`${colSpan} flex flex-col group bg-white border border-slate-200 rounded-lg p-3 shadow-xs hover:shadow-md transition-shadow duration-300`}
              >
                <Link href={targetUrl} className="block relative overflow-hidden rounded-md bg-slate-100">
                  <div className={`relative w-full ${aspectClass} overflow-hidden`}>
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes={isLarge ? "(max-width: 768px) 100vw, 800px" : "(max-width: 768px) 100vw, 450px"}
                      className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    
                    {/* Hover Badge */}
                    <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white text-blue-600 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-100 scale-75">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>

                    {/* Category Tag Overlay */}
                    <div className="absolute bottom-3.5 left-3.5 text-[10px] uppercase font-mono font-semibold tracking-wider text-blue-700 bg-white/95 px-2.5 py-1 rounded shadow-xs">
                      {project.categoryName}
                    </div>
                  </div>
                </Link>

                {/* Meta & Title */}
                <div className="pt-3.5 px-1 pb-1 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      <Link href={targetUrl}>{project.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 font-normal tracking-normal mt-0.5">
                      {project.subtitle || `${project.location || 'Sri Lanka'} · ${project.year}`}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-medium pt-0.5">
                    {project.year}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
