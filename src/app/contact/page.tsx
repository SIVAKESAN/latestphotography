import { MessageCircle, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import { siteSettings, buildWhatsAppLink } from '@/config/siteContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description: "Contact LATEST PHOTOGRAPHY via WhatsApp, Instagram, or email for photography and design commissions in Sri Lanka.",
};

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppLink(
    siteSettings.contact.whatsappNumber,
    "Hi Jeyantha, I would like to enquire about a commission with LATEST PHOTOGRAPHY."
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-28 pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold">
            CONNECT & ENQUIRE
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate-900 uppercase tracking-tight mt-1.5">
            Let&apos;s Talk
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal max-w-xl leading-relaxed">
            WhatsApp is the fastest and primary route to discuss dates, shoot ideas, or design requirements.
          </p>
        </div>

        {/* Primary Action Card */}
        <div className="p-8 md:p-10 bg-slate-50 border border-blue-200 rounded-lg shadow-sm mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-blue-700 text-xs font-mono font-semibold uppercase tracking-wider mb-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>PRIMARY DIRECT ROUTE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Chat on WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1">
              Direct response from founder Jeyantha ({siteSettings.contact.whatsappFormatted})
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-[0.15em] rounded-md flex items-center gap-2.5 transition-all shadow-sm shrink-0"
          >
            <span>OPEN WHATSAPP</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Instagram */}
          <a
            href={siteSettings.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-lg shadow-xs hover:shadow-md transition-all block group"
          >
            <InstagramIcon className="w-5 h-5 text-blue-600 mb-3" />
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Instagram
            </h3>
            <p className="text-xs text-slate-500 font-normal mt-1">{siteSettings.contact.instagramHandle}</p>
            <span className="text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mt-3 inline-block">
              View Feed →
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${siteSettings.contact.email}`}
            className="p-6 bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-lg shadow-xs hover:shadow-md transition-all block group"
          >
            <Mail className="w-5 h-5 text-blue-600 mb-3" />
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Email
            </h3>
            <p className="text-xs text-slate-500 font-normal mt-1">{siteSettings.contact.email}</p>
            <span className="text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mt-3 inline-block">
              Send Email →
            </span>
          </a>

          {/* Location */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-xs block">
            <MapPin className="w-5 h-5 text-blue-600 mb-3" />
            <h3 className="text-base font-bold text-slate-900">
              Location
            </h3>
            <p className="text-xs text-slate-500 font-normal mt-1">Based in {siteSettings.locationPrimary}</p>
            <p className="text-xs text-slate-500 mt-2 font-normal">
              Available across Northern Province & Colombo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
