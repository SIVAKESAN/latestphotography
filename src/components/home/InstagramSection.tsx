'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import { sampleImages } from '@/config/sampleImages';
import { siteSettings } from '@/config/siteContent';

export default function InstagramSection() {
  return (
    <section className="py-24 md:py-32 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold">
              08 // SOCIAL ARCHIVE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 uppercase tracking-tight mt-1.5">
              From The Latest Feed
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal">
              Follow along on Instagram for recent graduation captures, behind-the-scenes shoots, and design work.
            </p>
          </div>

          <a
            href={siteSettings.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.15em] font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            <InstagramIcon className="w-4 h-4 text-blue-600" />
            <span>VIEW INSTAGRAM ({siteSettings.contact.instagramHandle})</span>
            <ArrowUpRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Modern 6-column photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {sampleImages.instagram.map((url, idx) => (
            <motion.a
              key={idx}
              href={siteSettings.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="group block relative aspect-square overflow-hidden rounded-lg bg-slate-100 border border-slate-200 shadow-xs hover:shadow-md"
            >
              <Image
                src={url}
                alt={`Instagram capture ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <InstagramIcon className="w-5 h-5 text-white drop-shadow-md" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
