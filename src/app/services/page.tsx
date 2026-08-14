import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { servicesList, siteSettings, buildWhatsAppLink } from '@/config/siteContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Services & Commissions",
  description: "Photography and design services offered by LATEST PHOTOGRAPHY in Jaffna and across Sri Lanka.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold">
            CREATIVE DISCIPLINES & COMMISSIONS
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 uppercase tracking-tight mt-1.5">
            Services
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal max-w-xl leading-relaxed">
            Every shoot and design identity is tailored to your occasion and aesthetic. Rates are enquiry-based to ensure flexibility across Jaffna, Kilinochchi, Colombo, and Northern Province.
          </p>
        </div>

        {/* Photography Services Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">01 // PRIMARY FOCUS</span>
            <h2 className="text-2xl font-bold text-slate-900 uppercase">Photography Commissions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.filter(s => s.type === 'photography').map((service, idx) => {
              const whatsappUrl = buildWhatsAppLink(
                siteSettings.contact.whatsappNumber,
                service.whatsappMessage
              );

              return (
                <div
                  key={service.id}
                  className="bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-lg p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
                >
                  <div>
                    <span className="text-xs font-mono text-blue-600 font-semibold">0{idx + 1}</span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-blue-600 font-medium tracking-normal mt-1">
                      {service.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2.5 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-5 pt-5 border-t border-slate-200">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2.5">
                        DELIVERABLES INCLUDED
                      </p>
                      <ul className="space-y-1.5">
                        {service.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="text-xs text-slate-600 font-normal flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-200">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full text-xs uppercase tracking-[0.15em] font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 text-blue-600" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Visual Design Services Section */}
        <section>
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">02 // DESIGN DISCIPLINE</span>
            <h2 className="text-2xl font-bold text-slate-900 uppercase">Visual Design Commissions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesList.filter(s => s.type === 'design').map((service, idx) => {
              const whatsappUrl = buildWhatsAppLink(
                siteSettings.contact.whatsappNumber,
                service.whatsappMessage
              );

              return (
                <div
                  key={service.id}
                  className="bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-lg p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
                >
                  <div>
                    <span className="text-xs font-mono text-blue-600 font-semibold">0{idx + 1}</span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-blue-600 font-medium tracking-normal mt-1">
                      {service.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2.5 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-5 pt-5 border-t border-slate-200">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2.5">
                        PROCESS & DELIVERABLES
                      </p>
                      <ul className="space-y-1.5">
                        {service.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="text-xs text-slate-600 font-normal flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-200">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full text-xs uppercase tracking-[0.15em] font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 text-blue-600" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
