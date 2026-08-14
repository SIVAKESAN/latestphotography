import { MetadataRoute } from 'next';
import { initialProjects, initialCategories } from '@/config/siteContent';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://latestphotography.lk';
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/work`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/work/design`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Category routes
  const categoryRoutes: MetadataRoute.Sitemap = initialCategories.map((cat) => ({
    url: `${baseUrl}/work/${cat.type}/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Project Story routes
  const projectRoutes: MetadataRoute.Sitemap = initialProjects.map((proj) => ({
    url: `${baseUrl}/work/${proj.type}/story/${proj.slug}`,
    lastModified: new Date(proj.updatedAt || proj.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...categoryRoutes, ...projectRoutes];
}
