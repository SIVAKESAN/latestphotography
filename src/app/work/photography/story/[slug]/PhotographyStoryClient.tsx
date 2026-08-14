'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import { Project } from '@/types';
import FullscreenImageViewer from '@/components/gallery/FullscreenImageViewer';
import { siteSettings, buildWhatsAppLink } from '@/config/siteContent';

interface PhotographyStoryClientProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function PhotographyStoryClient({
  project,
  prevProject,
  nextProject
}: PhotographyStoryClientProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openViewer = (index: number) => {
    setSelectedImageIndex(index);
    setViewerOpen(true);
  };

  const whatsappInquiryUrl = buildWhatsAppLink(
    siteSettings.contact.whatsappNumber,
    `Hi Jeyantha, I loved your photography story "${project.title}" (${project.categoryName}) and would like to enquire about a similar shoot.`
  );

  const allImages = project.images && project.images.length > 0
    ? project.images
    : [{ id: 'cover', projectId: project.id, url: project.coverImage, altText: project.title, sortOrder: 0 }];

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-28 md:pt-32 pb-32">
      {/* Top Back Nav */}
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <Link
          href={`/work/photography/${project.category}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-600 hover:text-blue-600 font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {project.categoryName}</span>
        </Link>
      </div>

      {/* Story Title & Minimal Metadata Header */}
      <header className="max-w-5xl mx-auto px-6 mb-14 md:mb-20 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold"
        >
          {project.categoryName.toUpperCase()}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 uppercase tracking-tight mt-2"
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-2 text-xs sm:text-sm text-slate-500 font-medium tracking-wider uppercase font-mono"
        >
          {project.subtitle || `${project.location || 'Jaffna'} · ${project.year}`}
        </motion.p>
      </header>

      {/* Pure Image Story Sequence */}
      <main className="max-w-6xl mx-auto px-6 space-y-10 md:space-y-16">
        {allImages.map((img, idx) => {
          const isWide = idx % 3 === 0;
          const containerClass = isWide
            ? "w-full aspect-[16/10] md:aspect-[21/9]"
            : idx % 2 === 0
            ? "max-w-4xl mx-auto aspect-[4/5] md:aspect-[3/2]"
            : "max-w-5xl mx-auto aspect-[16/10]";

          return (
            <motion.figure
              key={img.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative group cursor-pointer"
              onClick={() => openViewer(idx)}
            >
              <div className={`relative ${containerClass} overflow-hidden rounded-lg bg-slate-100 border border-slate-200 shadow-sm hover:shadow-md transition-shadow`}>
                <Image
                  src={img.url}
                  alt={img.altText || `${project.title} story image ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
                />

                {/* Click to expand hover hint */}
                <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="px-3.5 py-2 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-md text-xs uppercase tracking-wider font-semibold text-slate-800 flex items-center gap-2 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>View Fullscreen</span>
                  </div>
                </div>
              </div>

              {img.altText && (
                <figcaption className="mt-2 text-xs text-slate-500 font-normal text-right pr-1">
                  {img.altText}
                </figcaption>
              )}
            </motion.figure>
          );
        })}
      </main>

      {/* Story Narrative Footer & Direct WhatsApp Enquiry */}
      <section className="max-w-3xl mx-auto px-6 mt-20 text-center bg-slate-50 border border-slate-200 rounded-lg p-10 shadow-xs">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold mb-1.5">
          RESERVE COVERAGE
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Inspired by this story?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal max-w-md mx-auto">
          Book your graduation convocation, intimate event, or portrait session with LATEST PHOTOGRAPHY.
        </p>

        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all"
        >
          <span>Enquire on WhatsApp</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </section>

      {/* Previous / Next Project Story Navigation */}
      <nav className="max-w-6xl mx-auto px-6 mt-16 pt-10 border-t border-slate-200 flex items-center justify-between">
        {prevProject ? (
          <Link
            href={`/work/photography/story/${prevProject.slug}`}
            className="group flex items-center gap-3 text-xs uppercase tracking-wider text-slate-600 hover:text-blue-600 transition-colors text-left"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">PREVIOUS STORY</span>
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                {prevProject.title}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            href={`/work/photography/story/${nextProject.slug}`}
            className="group flex items-center gap-3 text-xs uppercase tracking-wider text-slate-600 hover:text-blue-600 transition-colors text-right"
          >
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">NEXT STORY</span>
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                {nextProject.title}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </nav>

      {/* Fullscreen Lightbox Image Viewer */}
      <FullscreenImageViewer
        images={allImages}
        initialIndex={selectedImageIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </div>
  );
}
