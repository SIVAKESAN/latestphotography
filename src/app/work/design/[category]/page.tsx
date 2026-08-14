import { DataService } from '@/lib/dataService';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const categories = await DataService.getCategories('design');
  const cat = categories.find(c => c.slug === category);

  const title = cat ? `${cat.name} Portfolio` : 'Design Portfolio';
  return {
    title,
    description: cat?.description || "Design and identity case studies from LATEST PHOTOGRAPHY.",
  };
}

export default async function DesignCategoryPage({
  params
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categories = await DataService.getCategories('design');
  const currentCat = categories.find(c => c.slug === category);

  if (!currentCat) {
    notFound();
  }

  const projects = await DataService.getProjects({
    type: 'design',
    category,
    status: 'published'
  });

  return (
    <div className="min-h-screen bg-white pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <Link
          href="/work/design"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-600 hover:text-blue-600 font-semibold transition-colors mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Design Archive</span>
        </Link>

        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-600 font-semibold">
            DESIGN // {currentCat.name.toUpperCase()}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 uppercase tracking-tight mt-1.5">
            {currentCat.name}
          </h1>
          {currentCat.description && (
            <p className="mt-3 text-sm text-slate-600 font-normal max-w-xl">
              {currentCat.description}
            </p>
          )}
        </div>

        {/* Category Projects Grid */}
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
              </Link>

              <div className="pt-3.5 px-1 pb-1 flex items-start justify-between">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    <Link href={`/work/design/story/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h2>
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
