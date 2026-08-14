'use client';

import { motion } from 'framer-motion';

export default function BrandStatement() {
  return (
    <section id="brand-statement" className="py-24 md:py-32 bg-white border-t border-slate-100 relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        {/* Number identifier */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold mb-6"
        >
          02 // MANIFESTO
        </motion.div>

        {/* Core Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 uppercase leading-tight"
        >
          We capture moments. <br />
          <span className="text-blue-600 font-semibold">We create identities.</span>
        </motion.h2>

        {/* Narrative Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed"
        >
          <p>
            Photography is the preservation of unrepeatable time—academic triumphs, cultural heritage, and raw human connection. Visual design is the deliberate articulation of essence.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 tracking-wide">
            An independent, photography-led creative practice rooted in Jaffna, crafting quiet, cinematic, and enduring stories.
          </p>
        </motion.div>

        {/* Subtle Decorative Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-12 h-[2px] bg-blue-600 mx-auto mt-10 rounded-full"
        />
      </div>
    </section>
  );
}
