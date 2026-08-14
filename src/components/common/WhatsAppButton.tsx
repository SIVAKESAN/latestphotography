'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { siteSettings, buildWhatsAppLink } from '@/config/siteContent';

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Do not show on admin screens
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const defaultMsg = "Hi Jeyantha, I'm reaching out through LATEST PHOTOGRAPHY website.";
  const link = buildWhatsAppLink(siteSettings.contact.whatsappNumber, defaultMsg);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact LATEST PHOTOGRAPHY on WhatsApp"
        className="group flex items-center gap-3 px-4 py-3 bg-white/95 hover:bg-white text-slate-800 border border-slate-200 hover:border-blue-500 rounded-full shadow-lg hover:shadow-xl backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        </div>
        <span className="text-xs uppercase tracking-wider font-semibold text-slate-700 group-hover:text-blue-600 transition-colors duration-200">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
