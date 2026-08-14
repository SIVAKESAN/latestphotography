'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { servicesList, siteSettings, buildWhatsAppLink } from '@/config/siteContent';

export default function ServicesSection() {
  return (
    <section className="py-24 md:py-32 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold">
            07 // COMMISSIONS & SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 uppercase tracking-tight mt-1.5">
            Creative Offerings
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal max-w-xl">
            Every commission is customized to your event timeline, personal vision, or brand scope. Transparent enquiry-based booking directly via WhatsApp.
          </p>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, idx) => {
            const whatsappUrl = buildWhatsAppLink(
              siteSettings.contact.whatsappNumber,
              service.whatsappMessage
            );

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="group bg-white border border-slate-200 hover:border-blue-300 rounded-lg p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3.5 border-b border-slate-100">
                    <span className="uppercase text-blue-600 font-semibold tracking-wider">{service.type}</span>
                    <span className="font-semibold text-slate-400">0{idx + 1}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-blue-600 font-medium tracking-normal mt-1">
                    {service.tagline}
                  </p>
                  <p className="text-xs text-slate-600 font-normal mt-2.5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <ul className="mt-5 space-y-1.5 border-t border-slate-100 pt-4">
                    {service.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="text-[11px] text-slate-600 font-normal flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action Link */}
                <div className="pt-6 mt-5 border-t border-slate-100">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full text-xs uppercase tracking-[0.15em] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
