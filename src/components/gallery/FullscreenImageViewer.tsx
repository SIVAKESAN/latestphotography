'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectImage } from '@/types';

interface FullscreenImageViewerProps {
  images: ProjectImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenImageViewer({
  images,
  initialIndex = 0,
  isOpen,
  onClose
}: FullscreenImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialIndex]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Mobile Touch Gestures (Swipe Left / Right)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext(); // Swiped left -> next
      else handlePrev(); // Swiped right -> prev
    }
    setTouchStartX(null);
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col justify-between select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 z-10">
          <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-slate-300 font-mono">
            <span className="text-blue-400 font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(images.length).padStart(2, '0')}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              aria-label="Close fullscreen gallery"
              className="group flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
            >
              <span className="hidden sm:inline font-mono">ESC</span>
              <div className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800/80 group-hover:border-blue-400 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-slate-200 group-hover:text-blue-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Center Image Container */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage.url + currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex items-center justify-center max-w-7xl max-h-[85vh]"
            >
              <Image
                src={currentImage.url}
                alt={currentImage.altText || "Photography gallery asset"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1600px"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows (Desktop & Tablet) */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous photograph"
                className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-slate-700 hover:border-blue-400 bg-slate-900/80 hover:bg-slate-900 backdrop-blur-sm items-center justify-center text-slate-300 hover:text-white transition-all duration-200 z-10 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next photograph"
                className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-slate-700 hover:border-blue-400 bg-slate-900/80 hover:bg-slate-900 backdrop-blur-sm items-center justify-center text-slate-300 hover:text-white transition-all duration-200 z-10 shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Caption & Navigation Hint Bar */}
        <div className="px-6 py-3.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-normal">
          <p className="truncate max-w-md">
            {currentImage.altText || currentImage.caption || "LATEST PHOTOGRAPHY Archive"}
          </p>
          <div className="hidden md:flex items-center gap-3 text-[11px] uppercase tracking-wider text-slate-400 font-mono">
            <span>Arrow Keys ← →</span>
            <span>·</span>
            <span>Swipe on mobile</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
