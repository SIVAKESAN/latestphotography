import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { sampleImages } from '@/config/sampleImages';
import { siteSettings, buildWhatsAppLink } from '@/config/siteContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Jeyantha",
  description: "Learn the story behind LATEST PHOTOGRAPHY — civil engineering undergraduate, visual storyteller, and designer based in Jaffna, Sri Lanka.",
};

export default function AboutPage() {
  const whatsappUrl = buildWhatsAppLink(
    siteSettings.contact.whatsappNumber,
    "Hi Jeyantha, I read your personal story on the website and would like to connect."
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-28 pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold">
            ABOUT // JEYANTHA
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate-900 tracking-tight mt-2 leading-[1.08]">
            Engineering by profession. <br />
            <span className="text-blue-600 font-semibold">Creativity by passion.</span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-slate-600 font-normal max-w-xl leading-relaxed">
            {siteSettings.founderTitle}
          </p>
        </div>

        {/* Editorial Imagery Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-start">
          <div className="lg:col-span-7 relative aspect-[4/5] bg-slate-100 border border-slate-200 rounded-lg overflow-hidden shadow-md">
            <Image
              src={sampleImages.about.portrait}
              alt="Jeyantha Portrait"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 text-xs font-mono text-white/90 font-medium tracking-wider uppercase drop-shadow-xs">
              JAFFNA, SRI LANKA // ARCHIVE
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[16/10] bg-slate-100 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              <Image
                src={sampleImages.about.behindTheScenes1}
                alt="Behind the camera"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>

            <div className="relative aspect-[16/10] bg-slate-100 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
              <Image
                src={sampleImages.about.behindTheScenes2}
                alt="Creative workflow"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Story Narrative Sections */}
        <div className="max-w-3xl mx-auto space-y-12 border-t border-slate-200 pt-14">
          {/* 01 WHO I AM */}
          <section className="space-y-3 bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-8 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-blue-600 font-semibold">
              01 // WHO I AM
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              A Personal Creative Practice
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              I am Jeyantha, the photographer and visual designer behind LATEST PHOTOGRAPHY. Operating independently from Jaffna, I focus on quiet, cinematic imagery and deliberate brand identities. I do not run a sprawling agency—every project is crafted with direct human attention and artistic care.
            </p>
          </section>

          {/* 02 THE CREATIVE SIDE */}
          <section className="space-y-3 bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-8 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-blue-600 font-semibold">
              02 // THE CREATIVE SIDE
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Learning Alongside Seniors
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Photography entered my life upon stepping into university. Learning and shooting together with inspiring seniors, I developed an intuitive feel for capturing decisive moments, graduation convocations, and raw cultural gatherings. What began as exploration quickly matured into a devoted craft.
            </p>
          </section>

          {/* 03 PHOTOGRAPHY & DESIGN */}
          <section className="space-y-3 bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-8 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-blue-600 font-semibold">
              03 // PHOTOGRAPHY & DESIGN
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Two Disciplines, One Creative Vision
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Photography spans five distinct avenues: Graduation, Events, Portraits, Kovil Festivals, and Sports. Design started earlier around Grade 10, focusing on minimalist logo identities and athletic matchday posters. Both disciplines share a dedication to composition, balance, and emotional resonance.
            </p>
          </section>

          {/* 04 ENGINEERING × CREATIVITY */}
          <section className="space-y-3 bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-8 shadow-xs">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-blue-600 font-semibold">
              04 // ENGINEERING × CREATIVITY
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              An Honest Dual Path
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Civil Engineering is my academic and professional foundation; photography and design are the creative side of who I am. Rather than forcing a artificial overlap, they balance each other—structural precision on one side, intuitive visual storytelling on the other.
            </p>
          </section>
        </div>

        {/* Final CTA */}
        <div className="max-w-3xl mx-auto mt-20 text-center bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-lg p-10 shadow-xs">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-blue-600 font-semibold block mb-2">
            COLLABORATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 uppercase">
            Let&apos;s create something worth remembering.
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 font-normal max-w-md mx-auto">
            Available for graduation milestones, event coverage, and identity design across Jaffna, Kilinochchi, Colombo, and Northern Province.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-[0.15em] rounded-md shadow-sm transition-all"
          >
            <span>CONNECT ON WHATSAPP</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
