'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Mail, ArrowUp } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import { siteSettings, buildWhatsAppLink } from '@/config/siteContent';

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = buildWhatsAppLink(
    siteSettings.contact.whatsappNumber,
    "Hi Jeyantha, I'm reaching out from the LATEST PHOTOGRAPHY website."
  );

  return (
    <footer className="bg-slate-50 text-slate-800 border-t border-slate-200 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-200">
          {/* Brand & Manifesto Column */}
          <div className="md:col-span-6 space-y-4">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-900 font-sans">
              LATEST PHOTOGRAPHY
            </h2>
            <p className="text-xl md:text-2xl font-normal text-slate-700 italic max-w-md">
              &ldquo;{siteSettings.tagline}&rdquo;
            </p>
            <p className="text-xs text-slate-500 tracking-wide font-normal max-w-sm pt-2">
              A photography-first personal creative practice. Engineering by profession. Creativity by passion.
            </p>
          </div>

          {/* Location & Availability */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.15em] font-bold text-blue-700">
              LOCATION & REACH
            </h3>
            <p className="text-sm text-slate-800 font-normal">
              Based in {siteSettings.locationPrimary}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Available across Jaffna, Kilinochchi, Colombo & Northern Province.
            </p>
          </div>

          {/* Connect & Direct Channels */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.15em] font-bold text-blue-700">
              DIRECT CHANNELS
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors inline-flex items-center gap-2 font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp ({siteSettings.contact.whatsappFormatted})</span>
                </a>
              </li>
              <li>
                <a
                  href={siteSettings.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors inline-flex items-center gap-2 font-medium"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>Instagram ({siteSettings.contact.instagramHandle})</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteSettings.contact.email}`}
                  className="hover:text-blue-600 transition-colors inline-flex items-center gap-2 font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>{siteSettings.contact.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-normal">
          <p>© {new Date().getFullYear()} LATEST PHOTOGRAPHY. All rights reserved.</p>
          
          <div className="flex items-center gap-8 font-medium">
            <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
            <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            <button
              onClick={scrollToTop}
              className="hover:text-blue-600 flex items-center gap-1 transition-colors uppercase tracking-wider text-[11px]"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3 text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
