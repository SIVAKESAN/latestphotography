import { DataService } from '@/lib/dataService';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PhotographyStoryClient from './PhotographyStoryClient';

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
    description: project.description || `Photography story: ${project.title} by LATEST PHOTOGRAPHY.`,
    openGraph: {
      images: [{ url: project.coverImage }]
    }
  };
}

export default async function PhotographyStoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await DataService.getProjectBySlug(slug);

  if (!project || project.type !== 'photography') {
    notFound();
  }

  const { prev, next } = await DataService.getAdjacentProjects(slug, 'photography');

  return (
    <PhotographyStoryClient project={project} prevProject={prev} nextProject={next} />
  );
}
