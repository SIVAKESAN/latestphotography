import { Project, Category, SiteSettings, AnalyticsSummary, ProjectType } from '@/types';
import { initialProjects, initialCategories, siteSettings as defaultSettings } from '@/config/siteContent';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  PROJECTS: 'lp_projects_store_v1',
  CATEGORIES: 'lp_categories_store_v1',
  SETTINGS: 'lp_settings_store_v1',
  ANALYTICS: 'lp_analytics_store_v1',
};

// In-memory runtime state (for server-side or initial render)
let runtimeProjects: Project[] = [...initialProjects];
let runtimeCategories: Category[] = [...initialCategories];
let runtimeSettings: SiteSettings = { ...defaultSettings };
let runtimeAnalytics: AnalyticsSummary = {
  totalViews: 4820,
  projectViews: {
    "convocation-day-moratuwa": 1420,
    "nocturne-gathering-jaffna": 980,
    "solitude-and-grace-portrait": 890,
    "sacred-flame-kovil-festival": 640,
    "lumina-visual-identity": 530,
    "northern-derby-matchday-poster": 360,
  },
  galleryViews: 3120,
  whatsappClicks: 215,
  instagramClicks: 430,
  serviceInterest: {
    "graduation": 145,
    "events": 98,
    "portrait": 82,
    "kovil-events": 43,
    "logo": 38,
    "poster": 24,
    "sports": 19
  }
};

// Helper to get client-side storage safely
function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Storage read error for ${key}:`, e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Storage write error for ${key}:`, e);
  }
}

export const DataService = {
  // --- PROJECTS ---
  async getProjects(filter?: { type?: ProjectType; category?: string; status?: 'draft' | 'published'; includeDrafts?: boolean }): Promise<Project[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('projects').select('*, images:project_images(*)');
        if (filter?.type) query = query.eq('type', filter.type);
        if (filter?.category) query = query.eq('category', filter.category);
        if (!filter?.includeDrafts) query = query.eq('status', 'published');
        const { data, error } = await query.order('published_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data.map(p => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            subtitle: p.subtitle,
            type: p.type,
            category: p.category,
            categoryName: p.category_name || p.category,
            year: p.year,
            location: p.location,
            client: p.client,
            description: p.description,
            coverImage: p.cover_image,
            images: (p.images || []).sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)).map((img: any) => ({
              id: img.id,
              projectId: img.project_id,
              url: img.storage_path,
              altText: img.alt_text || '',
              sortOrder: img.sort_order || 0
            })),
            featured: p.featured,
            status: p.status,
            publishedAt: p.published_at,
            createdAt: p.created_at,
            updatedAt: p.updated_at,
            designStages: p.design_stages,
            posterFormats: p.poster_formats
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local dataset', err);
      }
    }

    const projects = getFromStorage(STORAGE_KEYS.PROJECTS, runtimeProjects);
    let list = [...projects];

    if (!filter?.includeDrafts) {
      list = list.filter(p => p.status === 'published');
    }
    if (filter?.type) {
      list = list.filter(p => p.type === filter.type);
    }
    if (filter?.category) {
      list = list.filter(p => p.category === filter.category);
    }

    // Requirement 35: Automatic latest work ordering by publication date descending
    return list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  },

  async getFeaturedProjects(): Promise<Project[]> {
    const all = await this.getProjects({ status: 'published' });
    const featured = all.filter(p => p.featured);
    return featured.length > 0 ? featured : all.slice(0, 6);
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const projects = await this.getProjects({ includeDrafts: true });
    return projects.find(p => p.slug === slug) || null;
  },

  async getAdjacentProjects(currentSlug: string, type?: ProjectType): Promise<{ prev: Project | null; next: Project | null }> {
    const projects = await this.getProjects({ type, status: 'published' });
    const index = projects.findIndex(p => p.slug === currentSlug);
    if (index === -1) return { prev: null, next: null };

    const prev = index > 0 ? projects[index - 1] : projects[projects.length - 1];
    const next = index < projects.length - 1 ? projects[index + 1] : projects[0];

    return { prev: prev.slug === currentSlug ? null : prev, next: next.slug === currentSlug ? null : next };
  },

  async saveProject(project: Project): Promise<Project> {
    const current = getFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, runtimeProjects);
    const existingIndex = current.findIndex(p => p.id === project.id);
    
    let updated: Project[];
    const now = new Date().toISOString();
    const updatedProject = { ...project, updatedAt: now };

    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = updatedProject;
    } else {
      updated = [updatedProject, ...current];
    }

    runtimeProjects = updated;
    saveToStorage(STORAGE_KEYS.PROJECTS, updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('projects').upsert({
          id: updatedProject.id,
          slug: updatedProject.slug,
          title: updatedProject.title,
          subtitle: updatedProject.subtitle,
          type: updatedProject.type,
          category: updatedProject.category,
          category_name: updatedProject.categoryName,
          year: updatedProject.year,
          location: updatedProject.location,
          client: updatedProject.client,
          description: updatedProject.description,
          cover_image: updatedProject.coverImage,
          featured: updatedProject.featured,
          status: updatedProject.status,
          published_at: updatedProject.publishedAt,
          updated_at: now,
          design_stages: updatedProject.designStages,
          poster_formats: updatedProject.posterFormats
        });
      } catch (err) {
        console.warn('Supabase upsert error:', err);
      }
    }

    return updatedProject;
  },

  async deleteProject(id: string): Promise<boolean> {
    const current = getFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, runtimeProjects);
    const updated = current.filter(p => p.id !== id);
    runtimeProjects = updated;
    saveToStorage(STORAGE_KEYS.PROJECTS, updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    }
    return true;
  },

  // --- CATEGORIES ---
  async getCategories(type?: ProjectType): Promise<Category[]> {
    const categories = getFromStorage(STORAGE_KEYS.CATEGORIES, runtimeCategories);
    if (type) {
      return categories.filter(c => c.type === type);
    }
    return categories;
  },

  async saveCategory(category: Category): Promise<Category> {
    const current = getFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, runtimeCategories);
    const index = current.findIndex(c => c.id === category.id);
    let updated: Category[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = category;
    } else {
      updated = [...current, category];
    }
    runtimeCategories = updated;
    saveToStorage(STORAGE_KEYS.CATEGORIES, updated);
    return category;
  },

  // --- SITE SETTINGS ---
  async getSiteSettings(): Promise<SiteSettings> {
    return getFromStorage(STORAGE_KEYS.SETTINGS, runtimeSettings);
  },

  async saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
    runtimeSettings = settings;
    saveToStorage(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  },

  // --- ANALYTICS ---
  async recordEvent(eventType: 'project_view' | 'gallery_view' | 'whatsapp_click' | 'instagram_click' | 'service_interest', metadata?: { slug?: string; service?: string }): Promise<void> {
    const analytics = getFromStorage<AnalyticsSummary>(STORAGE_KEYS.ANALYTICS, runtimeAnalytics);
    
    analytics.totalViews += 1;
    if (eventType === 'project_view' && metadata?.slug) {
      analytics.projectViews[metadata.slug] = (analytics.projectViews[metadata.slug] || 0) + 1;
    } else if (eventType === 'gallery_view') {
      analytics.galleryViews += 1;
    } else if (eventType === 'whatsapp_click') {
      analytics.whatsappClicks += 1;
    } else if (eventType === 'instagram_click') {
      analytics.instagramClicks += 1;
    } else if (eventType === 'service_interest' && metadata?.service) {
      analytics.serviceInterest[metadata.service] = (analytics.serviceInterest[metadata.service] || 0) + 1;
    }

    runtimeAnalytics = analytics;
    saveToStorage(STORAGE_KEYS.ANALYTICS, analytics);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('analytics_events').insert({
          event_type: eventType,
          meta: metadata,
          created_at: new Date().toISOString()
        });
      } catch (e) {
        // silent analytics record failure
      }
    }
  },

  async getAnalyticsSummary(): Promise<AnalyticsSummary> {
    return getFromStorage(STORAGE_KEYS.ANALYTICS, runtimeAnalytics);
  }
};
