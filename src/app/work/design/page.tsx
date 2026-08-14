import { DataService } from '@/lib/dataService';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Layers, LayoutGrid } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Visual Design Archive",
  description: "Logo design identity systems and dynamic sports/event posters crafted by LATEST PHOTOGRAPHY.",
};

export default async function DesignPortfolioPage() {
  const projects = await DataService.getProjects({
    type: 'design',
    status: 'published'
  });

  return (
    <div className="min-h-screen bg-white pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold">
            VISUAL DESIGN ARCHIVE
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 uppercase tracking-tight mt-1.5">
            Design & Identity
          </h1>
          <p className="mt-3 text-sm text-slate-600 font-normal max-w-xl">
            A deliberate creative discipline combining strategic brandmarks and editorial poster systems. Practised with geometric precision since Grade 10.
          </p>
        </div>

        {/* Subcategory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/work/design/logo"
            className="group p-6 bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-lg shadow-xs hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Logo & Identity Systems
                </h2>
                <p className="text-xs text-slate-500">Full 7-stage case studies</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>

          <Link
            href="/work/design/poster"
            className="group p-6 bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-lg shadow-xs hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-xs">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Poster & Social Visuals
                </h2>
                <p className="text-xs text-slate-500">Multi-format event and sports layouts</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article key={project.id} className="group flex flex-col bg-white border border-slate-200 rounded-lg p-3 shadow-xs hover:shadow-md transition-shadow duration-300">
              <Link
                href={`/work/design/story/${project.slug}`}
                className="block relative aspect-[16/10] overflow-hidden rounded-md bg-slate-100"
              >
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white text-blue-600 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3.5 left-3.5 text-[10px] uppercase font-mono font-semibold tracking-wider text-blue-700 bg-white/95 px-2.5 py-1 rounded shadow-xs">
                  {project.categoryName}
                </div>
              </Link>

              <div className="pt-3.5 px-1 pb-1 flex items-start justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    <Link href={`/work/design/story/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    {project.subtitle || `${project.location} · ${project.year}`}
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400 font-medium pt-0.5">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
