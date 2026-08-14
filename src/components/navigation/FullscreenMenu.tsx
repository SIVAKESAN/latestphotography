'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, MessageCircle, Mail } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import { sampleImages } from '@/config/sampleImages';
import { siteSettings } from '@/config/siteContent';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  number: string;
  label: string;
  href: string;
  previewImage: string;
  description: string;
}

const navItems: NavItem[] = [
  {
    number: "01",
    label: "WORK",
    href: "/work",
    previewImage: sampleImages.featuredStories.graduation,
    description: "Complete archive of photography & visual design",
  },
  {
    number: "02",
    label: "STORIES",
    href: "/work/photography/graduation",
    previewImage: sampleImages.photography.graduation[0],
    description: "Graduation, events, portraits & cultural narratives",
  },
  {
    number: "03",
    label: "DESIGN",
    href: "/work/design",
    previewImage: sampleImages.design.logoProject.cover,
    description: "Logo identity processes & sports/event posters",
  },
  {
    number: "04",
    label: "ABOUT",
    href: "/about",
    previewImage: sampleImages.about.portrait,
    description: "Jeyantha — Civil Engineering & Creative Practice",
  },
  {
    number: "05",
    label: "SERVICES",
    href: "/services",
    previewImage: sampleImages.photography.events[0],
    description: "Graduation, event, portrait & identity commissions",
  },
  {
    number: "06",
    label: "CONTACT",
    href: "/contact",
    previewImage: sampleImages.about.behindTheScenes1,
    description: "Direct WhatsApp & commission enquiries",
  }
];

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const [activeImage, setActiveImage] = useState<string>(navItems[0].previewImage);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-white/98 text-slate-900 flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-6">
            <Link
              href="/"
              onClick={onClose}
              className="text-xs uppercase tracking-[0.2em] font-bold text-slate-900 hover:text-blue-600 transition-colors"
            >
              LATEST PHOTOGRAPHY
            </Link>

            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="flex items-center gap-2 group text-xs uppercase tracking-[0.2em] font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              <span>CLOSE</span>
              <div className="w-8 h-8 rounded-full border border-slate-300 group-hover:border-blue-600 bg-slate-50 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-slate-700 group-hover:text-blue-600 transition-colors" />
              </div>
            </button>
          </div>

          {/* Menu Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-12">
            {/* Nav Links Column */}
            <nav className="lg:col-span-7 flex flex-col justify-center space-y-4 md:space-y-6">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + idx * 0.04, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    onMouseEnter={() => setActiveImage(item.previewImage)}
                    className="group flex items-baseline gap-4 md:gap-8 py-2 text-left"
                  >
                    <span className="text-xs md:text-sm font-mono font-semibold text-blue-600 tracking-widest">
                      {item.number}
                    </span>
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-slate-800 group-hover:text-blue-600 group-hover:translate-x-3 transition-all duration-200">
                      {item.label}
                    </span>
                    <span className="hidden md:inline-block text-xs uppercase tracking-wider text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-4 font-normal">
                      {item.description}
                    </span>
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 opacity-0 group-hover:opacity-100" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop Image Preview Column */}
            <div className="hidden lg:flex lg:col-span-5 items-center justify-center pl-8 border-l border-slate-200">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeImage}
                      alt="Portfolio Preview"
                      fill
                      sizes="400px"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-white/90 font-medium tracking-wider drop-shadow-sm">
                  ARCHIVE // 2026
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Meta & Social Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-xs text-slate-600">
            <div>
              <p className="text-slate-900 font-semibold tracking-wider uppercase">LOCATION</p>
              <p className="mt-1">Based in Jaffna · Serving Northern Province & Colombo</p>
            </div>
            <div>
              <p className="text-slate-900 font-semibold tracking-wider uppercase">PRIMARY DISCIPLINE</p>
              <p className="mt-1">Graduation · Events · Portraits · Identity Design</p>
            </div>
            <div className="flex items-center md:justify-end gap-6">
              <a
                href={siteSettings.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors flex items-center gap-1.5 font-medium"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
              <a
                href={`mailto:${siteSettings.contact.email}`}
                className="hover:text-blue-600 transition-colors flex items-center gap-1.5 font-medium"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
              <Link
                href="/admin/login"
                onClick={onClose}
                className="hover:text-blue-600 transition-colors text-slate-400"
              >
                Admin
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
