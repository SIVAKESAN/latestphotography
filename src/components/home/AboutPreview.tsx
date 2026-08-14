'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { sampleImages } from '@/config/sampleImages';
import { siteSettings } from '@/config/siteContent';

export default function AboutPreview() {
  return (
    <section className="py-24 md:py-32 bg-white border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait & BTS Imagery */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden rounded-lg border border-slate-200 shadow-md">
              <Image
                src={sampleImages.about.portrait}
                alt="Jeyantha — Photographer & Visual Designer"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover brightness-95 hover:scale-102 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs font-mono uppercase tracking-wider text-blue-300 font-semibold">
                  FOUNDER & CREATIVE
                </p>
                <h3 className="text-2xl font-bold text-white mt-0.5">
                  {siteSettings.founderName}
                </h3>
              </div>
            </div>

            {/* Overlapping Mini BTS Accent Image */}
            <div className="hidden sm:block absolute -bottom-5 -right-5 w-36 md:w-44 aspect-square border-4 border-white rounded-lg overflow-hidden shadow-lg bg-slate-100">
              <Image
                src={sampleImages.about.behindTheScenes1}
                alt="Behind the camera in Jaffna"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Story Narrative Column */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold">
              06 // THE CREATOR
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Engineering by profession. <br />
              <span className="text-blue-600 font-semibold">Creativity by passion.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              <p>
                LATEST PHOTOGRAPHY was born from a genuine love for human observation and visual balance. My photography journey started upon entering university, learning techniques and shooting alongside inspiring seniors.
              </p>
              <p className="text-slate-600">
                Design began much earlier, in Grade 10, crafting brandmarks and layout systems. Civil Engineering provides analytical rigor, while photography and design form the artistic heartbeat of everything I create.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.15em] font-semibold text-slate-900 hover:text-blue-600 transition-colors"
              >
                <span>READ FULL STORY</span>
                <div className="w-8 h-8 rounded-full border border-slate-300 bg-slate-50 group-hover:border-blue-600 group-hover:bg-blue-50 flex items-center justify-center transition-all group-hover:translate-x-1 shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                </div>
              </Link>

              <span className="text-xs text-slate-400 font-mono tracking-wider">
                JAFFNA · SRI LANKA
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
