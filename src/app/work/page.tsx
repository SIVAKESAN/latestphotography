import { DataService } from '@/lib/dataService';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Archive & Work",
  description: "Explore the complete portfolio archive of LATEST PHOTOGRAPHY — Graduation, Events, Portraits, Kovil Festivals, Sports, Logo Design, and Posters.",
};

export default async function WorkPage({
  searchParams
}: {
  searchParams: Promise<{ type?: string; category?: string }>;
}) {
  const { type, category } = await searchParams;
  const projects = await DataService.getProjects({
    type: (type as any) || undefined,
    category: category || undefined,
    status: 'published'
  });
  const categories = await DataService.getCategories();

  return (
    <div className="min-h-screen bg-white pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold">
            COMPLETE ARCHIVE // 2026
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 uppercase tracking-tight mt-1.5">
            Selected Works
          </h1>
          <p className="mt-3 text-sm text-slate-600 font-normal max-w-xl">
            A curated collection of visual stories and design identities crafted across Jaffna, Northern Province, and Colombo.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2.5 pb-8 border-b border-slate-200 mb-10">
          <Link
            href="/work"
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-md transition-all ${
              !type && !category
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            All Works
          </Link>
          <Link
            href="/work?type=photography"
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-md transition-all ${
              type === 'photography' && !category
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Photography
          </Link>
          <Link
            href="/work?type=design"
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider rounded-md transition-all ${
              type === 'design' && !category
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Visual Design
          </Link>

          <span className="text-slate-300 hidden md:inline px-2">|</span>

          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/work?category=${cat.slug}`}
              className={`px-3 py-1 text-xs uppercase tracking-wider rounded-md transition-all ${
                category === cat.slug
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Portfolio Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const targetUrl = project.type === 'photography'
              ? `/work/photography/story/${project.slug}`
              : `/work/design/story/${project.slug}`;

            return (
              <article key={project.id} className="group flex flex-col bg-white border border-slate-200 rounded-lg p-3 shadow-xs hover:shadow-md transition-shadow duration-300">
                <Link href={targetUrl} className="block relative aspect-[4/5] overflow-hidden rounded-md bg-slate-100">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white text-blue-600 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 text-[10px] uppercase font-mono font-semibold tracking-wider text-blue-700 bg-white/95 px-2.5 py-1 rounded shadow-xs">
                    {project.categoryName}
                  </div>
                </Link>

                <div className="pt-3.5 px-1 pb-1 flex items-start justify-between">
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      <Link href={targetUrl}>{project.title}</Link>
                    </h2>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      {project.subtitle || `${project.location} · ${project.year}`}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-medium pt-0.5">{project.year}</span>
                </div>
              </article>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="py-20 text-center text-slate-500">
            <p className="text-sm font-normal">No projects found in this category.</p>
            <Link href="/work" className="mt-3 inline-block text-xs uppercase tracking-wider text-blue-600 font-semibold hover:underline">
              Reset Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
