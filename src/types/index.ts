export type ProjectType = 'photography' | 'design';

export type PhotographyCategory = 'graduation' | 'events' | 'portrait' | 'kovil-events' | 'sports' | string;
export type DesignCategory = 'logo' | 'poster' | string;

export interface ProjectImage {
  id: string;
  projectId: string;
  url: string;
  altText: string;
  caption?: string;
  width?: number;
  height?: number;
  sortOrder: number;
}

export interface DesignStage {
  step: string; // e.g. "01 — BRIEF"
  title: string;
  description: string;
  images?: string[];
  notes?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  type: ProjectType;
  category: PhotographyCategory | DesignCategory;
  categoryName: string;
  year: string;
  location?: string;
  client?: string;
  description?: string;
  coverImage: string;
  images: ProjectImage[];
  featured?: boolean;
  status: 'draft' | 'published';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  // For Logo Design Case Studies
  designStages?: DesignStage[];
  // For Poster Design Formats
  posterFormats?: {
    mainPoster: string;
    instagramPost?: string;
    storyFormat?: string;
    alternateVersion?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  type: ProjectType;
  slug: string;
  description?: string;
  count?: number;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  founderName: string;
  founderTitle: string;
  founderBioShort: string;
  founderBioLong: string[];
  locationPrimary: string;
  serviceAreas: string[];
  contact: {
    whatsappNumber: string;
    whatsappFormatted: string;
    instagramUrl: string;
    instagramHandle: string;
    email: string;
    phone: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
    keywords: string[];
  };
}

export interface AnalyticsSummary {
  totalViews: number;
  projectViews: Record<string, number>;
  galleryViews: number;
  whatsappClicks: number;
  instagramClicks: number;
  serviceInterest: Record<string, number>;
}
