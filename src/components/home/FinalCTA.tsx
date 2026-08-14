'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { siteSettings, buildWhatsAppLink } from '@/config/siteContent';

export default function FinalCTA() {
  const whatsappUrl = buildWhatsAppLink(
    siteSettings.contact.whatsappNumber,
    "Hi Jeyantha, I have a story to tell and would love to discuss a project with LATEST PHOTOGRAPHY."
  );

  return (
    <section className="py-24 md:py-36 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden border-t border-slate-200 text-center">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold"
        >
          09 // INITIATE CONVERSATION
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 uppercase tracking-tight mt-3 leading-tight"
        >
          Have a story to tell?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-sm sm:text-base text-slate-600 font-normal max-w-lg mx-auto leading-relaxed"
        >
          Whether booking a graduation milestone, planning event coverage, or building a distinctive brand mark, let’s start the conversation directly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-[0.15em] rounded-md transition-all duration-200 flex items-center gap-3 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>LET&apos;S TALK</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href={`mailto:${siteSettings.contact.email}`}
            className="px-8 py-3.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 hover:text-slate-900 font-semibold text-xs uppercase tracking-[0.15em] rounded-md transition-all duration-200 shadow-xs hover:bg-slate-50"
          >
            SEND AN EMAIL
          </a>
        </motion.div>

        <p className="mt-8 text-[11px] font-mono text-slate-400 tracking-wider uppercase font-medium">
          COMMISSIONS OPEN ACROSS JAFFNA, KILINOCHCHI, COLOMBO & NORTHERN PROVINCE
        </p>
      </div>
    </section>
  );
}
