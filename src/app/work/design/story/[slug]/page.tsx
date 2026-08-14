import { DataService } from '@/lib/dataService';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DesignStoryClient from './DesignStoryClient';

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await DataService.getProjectBySlug(slug);

  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — ${project.categoryName}`,
    description: project.description || `Visual Design case study: ${project.title} by LATEST PHOTOGRAPHY.`,
    openGraph: {
      images: [{ url: project.coverImage }]
    }
  };
}

export default async function DesignStoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await DataService.getProjectBySlug(slug);

  if (!project || project.type !== 'design') {
    notFound();
  }

  const { prev, next } = await DataService.getAdjacentProjects(slug, 'design');

  return (
    <DesignStoryClient project={project} prevProject={prev} nextProject={next} />
  );
}
