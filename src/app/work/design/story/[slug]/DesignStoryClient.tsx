'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { Project } from '@/types';
import { siteSettings, buildWhatsAppLink } from '@/config/siteContent';

interface DesignStoryClientProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function DesignStoryClient({
  project,
  prevProject,
  nextProject
}: DesignStoryClientProps) {
  const isLogo = project.category === 'logo';
  const isPoster = project.category === 'poster';

  const whatsappInquiryUrl = buildWhatsAppLink(
    siteSettings.contact.whatsappNumber,
    `Hi Jeyantha, I'm reviewing your design case study "${project.title}" (${project.categoryName}) and would like to discuss a design project.`
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-28 md:pt-32 pb-32">
      {/* Top Back Nav */}
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <Link
          href="/work/design"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-600 hover:text-blue-600 font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Design Archive</span>
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 mb-14 md:mb-18 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold"
        >
          {project.categoryName.toUpperCase()} · CASE STUDY
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
          {project.subtitle || `${project.location || 'Sri Lanka'} · ${project.year}`}
        </motion.p>

        {project.description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 text-sm text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed"
          >
            {project.description}
          </motion.p>
        )}
      </header>

      {/* Main Case Study Body */}
      <main className="max-w-6xl mx-auto px-6">
        {/* LOGO DESIGN 7-STAGE PROCESS */}
        {isLogo && project.designStages && (
          <div className="space-y-16 md:space-y-24">
            {project.designStages.map((stage, idx) => (
              <motion.section
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-8 shadow-xs"
              >
                <div className="lg:col-span-5 space-y-2.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
                    {stage.step}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {stage.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pt-1">
                    {stage.description}
                  </p>
                </div>

                <div className="lg:col-span-7">
                  {stage.images && stage.images.length > 0 ? (
                    <div className="relative aspect-[16/10] bg-slate-100 rounded-md overflow-hidden border border-slate-200 shadow-sm">
                      <Image
                        src={stage.images[0]}
                        alt={stage.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 700px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              </motion.section>
            ))}
          </div>
        )}

        {/* POSTER DESIGN MULTI-FORMAT SHOWCASE */}
        {isPoster && (
          <div className="space-y-14">
            {/* Main Poster */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-8 shadow-xs"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold block mb-3">
                01 // FULL POSTER MASTER
              </span>
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full bg-slate-100 rounded-md overflow-hidden border border-slate-200 shadow-sm">
                <Image
                  src={project.posterFormats?.mainPoster || project.coverImage}
                  alt={`${project.title} Master Poster`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Formats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              {project.posterFormats?.instagramPost && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-xs">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-medium block mb-2.5">
                    02 // INSTAGRAM (4:5 / 1:1)
                  </span>
                  <div className="relative aspect-square bg-slate-100 rounded border border-slate-200 overflow-hidden">
                    <Image
                      src={project.posterFormats.instagramPost}
                      alt="Instagram Feed Format"
                      fill
                      sizes="350px"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {project.posterFormats?.storyFormat && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-xs">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-medium block mb-2.5">
                    03 // STORY FORMAT (9:16)
                  </span>
                  <div className="relative aspect-[9/16] bg-slate-100 rounded border border-slate-200 overflow-hidden">
                    <Image
                      src={project.posterFormats.storyFormat}
                      alt="Instagram Story Format"
                      fill
                      sizes="350px"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {project.posterFormats?.alternateVersion && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-xs">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-medium block mb-2.5">
                    04 // ALTERNATE EDITION
                  </span>
                  <div className="relative aspect-square bg-slate-100 rounded border border-slate-200 overflow-hidden">
                    <Image
                      src={project.posterFormats.alternateVersion}
                      alt="Alternate Edition Format"
                      fill
                      sizes="350px"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Case Study Inquiry CTA */}
      <section className="max-w-3xl mx-auto px-6 mt-20 text-center bg-slate-50 border border-slate-200 rounded-lg p-10 shadow-xs">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold mb-1.5">
          START A BRAND COMMISSION
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Need a distinctive brand identity or poster?
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal max-w-md mx-auto">
          From concept sketches to finished production vectors and matchday graphics.
        </p>

        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all"
        >
          <span>Discuss Design on WhatsApp</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </section>

      {/* Previous / Next Design Project Navigation */}
      <nav className="max-w-6xl mx-auto px-6 mt-16 pt-10 border-t border-slate-200 flex items-center justify-between">
        {prevProject ? (
          <Link
            href={`/work/design/story/${prevProject.slug}`}
            className="group flex items-center gap-3 text-xs uppercase tracking-wider text-slate-600 hover:text-blue-600 transition-colors text-left"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">PREVIOUS PROJECT</span>
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
            href={`/work/design/story/${nextProject.slug}`}
            className="group flex items-center gap-3 text-xs uppercase tracking-wider text-slate-600 hover:text-blue-600 transition-colors text-right"
          >
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">NEXT PROJECT</span>
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
    </div>
  );
}
