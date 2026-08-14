import { Project, Category, SiteSettings } from '@/types';
import { sampleImages } from './sampleImages';

export const siteSettings: SiteSettings = {
  brandName: "LATEST PHOTOGRAPHY",
  tagline: "Capturing Moments, Creating Identity",
  founderName: "Jeyantha",
  founderTitle: "Photographer · Visual Designer · Civil Engineering Undergraduate",
  founderBioShort: "Engineering by profession. Creativity by passion.",
  founderBioLong: [
    "I am Jeyantha, a Civil Engineering undergraduate who discovered a deep passion for visual storytelling and brand creation.",
    "My photography journey began during my early university years, learning alongside and practising with inspiring seniors. What started as exploring the lens quickly grew into a dedicated discipline of capturing human connection, academic triumphs, cultural heritage, and decisive moments.",
    "Design started even earlier, around Grade 10, crafting visual identities and posters. While Civil Engineering provides an analytical foundation, photography and design are the creative soul of who I am.",
    "Based in Jaffna, Sri Lanka, and available for commissions across Jaffna, Kilinochchi, Colombo, and the Northern Province."
  ],
  locationPrimary: "Jaffna, Sri Lanka",
  serviceAreas: ["Jaffna", "Kilinochchi", "Colombo", "Northern Province"],
  contact: {
    whatsappNumber: "94770000000", // Configurable placeholder [WHATSAPP NUMBER]
    whatsappFormatted: "+94 77 000 0000",
    instagramUrl: "https://instagram.com/latestphotography.lk", // [INSTAGRAM URL]
    instagramHandle: "@latestphotography.lk",
    email: "contact@latestphotography.lk", // [EMAIL ADDRESS]
    phone: "+94 77 000 0000" // [PHONE NUMBER]
  },
  seo: {
    metaTitle: "LATEST PHOTOGRAPHY — Capturing Moments, Creating Identity",
    metaDescription: "Cinematic photography and visual design practice based in Jaffna, Sri Lanka. Specializing in graduation shoots, events, portraits, kovil festivals, sports, logo design, and posters across Northern Province & Colombo.",
    ogImage: sampleImages.hero,
    keywords: [
      "Jaffna photographer",
      "Graduation photographer Jaffna",
      "Event photographer Jaffna",
      "Portrait photographer Jaffna",
      "Kovil event photography Sri Lanka",
      "Northern Province photographer",
      "Logo design Jaffna",
      "Poster design Sri Lanka",
      "LATEST PHOTOGRAPHY",
      "Jeyantha"
    ]
  }
};

export const initialCategories: Category[] = [
  // Photography
  { id: "cat-1", name: "Graduation", type: "photography", slug: "graduation", description: "Academic milestones, graduation convocation ceremonies, and joyful celebratory portraits." },
  { id: "cat-2", name: "Events", type: "photography", slug: "events", description: "Gatherings, corporate celebrations, cultural evenings, and genuine candid moments." },
  { id: "cat-3", name: "Portrait", type: "photography", slug: "portrait", description: "Intimate, character-rich individual and editorial portraits in studio and natural light." },
  { id: "cat-4", name: "Kovil Events", type: "photography", slug: "kovil-events", description: "Devotional vibrancy, temple poojas, traditional sacred rituals, and cultural celebrations." },
  { id: "cat-5", name: "Sports", type: "photography", slug: "sports", description: "High-intensity athletic pursuits, decisive tournament action, and victory energy." },
  // Design
  { id: "cat-6", name: "Logo Design", type: "design", slug: "logo", description: "Strategic visual identities, monogram systems, and brand mark architecture." },
  { id: "cat-7", name: "Poster Design", type: "design", slug: "poster", description: "Dynamic event posters, sports matchday graphics, and social media key visuals." }
];

export const initialProjects: Project[] = [
  // 1. Graduation Story
  {
    id: "proj-1",
    slug: "convocation-day-moratuwa",
    title: "Moratuwa Convocation",
    subtitle: "University of Moratuwa · 2026",
    type: "photography",
    category: "graduation",
    categoryName: "Graduation",
    year: "2026",
    location: "Moratuwa, Sri Lanka",
    description: "An editorial graduation photo story capturing the triumphs, friendships, and milestone ceremonies of university graduates.",
    coverImage: sampleImages.photography.graduation[0],
    images: sampleImages.photography.graduation.map((url, i) => ({
      id: `img-grad-${i}`,
      projectId: "proj-1",
      url,
      altText: `Moratuwa Convocation celebration moment ${i + 1}`,
      sortOrder: i
    })),
    featured: true,
    status: "published",
    publishedAt: "2026-02-10T10:00:00Z",
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-02-10T10:00:00Z"
  },
  // 2. Events Story
  {
    id: "proj-2",
    slug: "nocturne-gathering-jaffna",
    title: "Nocturne Evening",
    subtitle: "Cultural Event · Jaffna 2026",
    type: "photography",
    category: "events",
    categoryName: "Events",
    year: "2026",
    location: "Jaffna, Sri Lanka",
    description: "A celebration of community, warm ambient evening light, and unscripted human encounters in Northern Sri Lanka.",
    coverImage: sampleImages.photography.events[0],
    images: sampleImages.photography.events.map((url, i) => ({
      id: `img-ev-${i}`,
      projectId: "proj-2",
      url,
      altText: `Nocturne Event candid moment ${i + 1}`,
      sortOrder: i
    })),
    featured: true,
    status: "published",
    publishedAt: "2026-02-04T12:00:00Z",
    createdAt: "2026-02-04T12:00:00Z",
    updatedAt: "2026-02-04T12:00:00Z"
  },
  // 3. Portrait Story
  {
    id: "proj-3",
    slug: "solitude-and-grace-portrait",
    title: "Quiet Presence",
    subtitle: "Editorial Portrait · 2026",
    type: "photography",
    category: "portrait",
    categoryName: "Portrait",
    year: "2026",
    location: "Colombo, Sri Lanka",
    description: "Natural light, authentic emotion, and thoughtful editorial composition exploring timeless individual presence.",
    coverImage: sampleImages.photography.portrait[0],
    images: sampleImages.photography.portrait.map((url, i) => ({
      id: `img-port-${i}`,
      projectId: "proj-3",
      url,
      altText: `Portrait series session ${i + 1}`,
      sortOrder: i
    })),
    featured: true,
    status: "published",
    publishedAt: "2026-01-28T09:00:00Z",
    createdAt: "2026-01-28T09:00:00Z",
    updatedAt: "2026-01-28T09:00:00Z"
  },
  // 4. Kovil Events Story
  {
    id: "proj-4",
    slug: "sacred-flame-kovil-festival",
    title: "Sacred Flames",
    subtitle: "Kovil Festival · Nallur 2026",
    type: "photography",
    category: "kovil-events",
    categoryName: "Kovil Events",
    year: "2026",
    location: "Nallur, Jaffna",
    description: "The spiritual resonance, devotional intensity, oil lamps, and time-honored rituals of sacred Tamil temple festivals.",
    coverImage: sampleImages.photography.kovilEvents[0],
    images: sampleImages.photography.kovilEvents.map((url, i) => ({
      id: `img-kovil-${i}`,
      projectId: "proj-4",
      url,
      altText: `Kovil temple devotional ceremony ${i + 1}`,
      sortOrder: i
    })),
    featured: true,
    status: "published",
    publishedAt: "2026-01-15T08:30:00Z",
    createdAt: "2026-01-15T08:30:00Z",
    updatedAt: "2026-01-15T08:30:00Z"
  },
  // 5. Sports Story
  {
    id: "proj-5",
    slug: "championship-rhythm-sports",
    title: "Championship Pulse",
    subtitle: "Tournament Action · 2026",
    type: "photography",
    category: "sports",
    categoryName: "Sports",
    year: "2026",
    location: "Kilinochchi, Sri Lanka",
    description: "Capturing high-speed athleticism, dynamic motion blur, and the electric tension of decisive game moments.",
    coverImage: sampleImages.photography.sports[0],
    images: sampleImages.photography.sports.map((url, i) => ({
      id: `img-sport-${i}`,
      projectId: "proj-5",
      url,
      altText: `Sports athletic action freeze ${i + 1}`,
      sortOrder: i
    })),
    featured: false,
    status: "published",
    publishedAt: "2026-01-10T16:00:00Z",
    createdAt: "2026-01-10T16:00:00Z",
    updatedAt: "2026-01-10T16:00:00Z"
  },
  // 6. Logo Design Case Study (Section 16: 7-Stage Process)
  {
    id: "proj-6",
    slug: "lumina-visual-identity",
    title: "Aura Identity",
    subtitle: "Brand Identity Design · 2026",
    type: "design",
    category: "logo",
    categoryName: "Logo Design",
    year: "2026",
    location: "Jaffna",
    description: "A complete logo and visual identity system crafted through research, structured sketch iterations, and geometric refinement.",
    coverImage: sampleImages.design.logoProject.cover,
    images: [
      { id: "img-l-1", projectId: "proj-6", url: sampleImages.design.logoProject.cover, altText: "Aura Identity Cover", sortOrder: 0 },
      { id: "img-l-2", projectId: "proj-6", url: sampleImages.design.logoProject.sketches, altText: "Initial Concept Sketches", sortOrder: 1 },
      { id: "img-l-3", projectId: "proj-6", url: sampleImages.design.logoProject.finalIdentity, altText: "Final Refined Mark", sortOrder: 2 },
      { id: "img-l-4", projectId: "proj-6", url: sampleImages.design.logoProject.applications, altText: "Real World Identity Mockup", sortOrder: 3 },
    ],
    designStages: [
      {
        step: "01 — BRIEF",
        title: "Project Scope & Core Objectives",
        description: "The objective was to create a timeless, minimalist emblem conveying precision, human connection, and modern architectural elegance for a contemporary creative brand.",
        images: [sampleImages.design.logoProject.brief]
      },
      {
        step: "02 — RESEARCH / DIRECTION",
        title: "Visual Direction & Geometric References",
        description: "Studying balanced typographic forms, classical serif counter-spaces, and modernist architectural grid systems to establish a dignified tonal benchmark.",
        images: [sampleImages.design.logoProject.research]
      },
      {
        step: "03 — SKETCHES",
        title: "Freehand Explorations & Concept Generation",
        description: "Translating initial conceptual metaphors onto paper through dozens of raw thumbnails, exploring letterform interactions and symbolic balance.",
        images: [sampleImages.design.logoProject.sketches]
      },
      {
        step: "04 — EXPLORATION",
        title: "Digital Vectorization & Proportional Studies",
        description: "Iterating promising sketch concepts in vector geometry, testing optical weight, corner radiuses, and silhouette clarity.",
        images: [sampleImages.design.logoProject.exploration]
      },
      {
        step: "05 — REFINEMENT",
        title: "Optical Weight & Grid Harmonization",
        description: "Aligning curves to harmonic golden ratio spirals and micro-adjusting typography kernings for seamless legibility at micro and billboard scales.",
        images: [sampleImages.design.logoProject.refinement]
      },
      {
        step: "06 — FINAL IDENTITY",
        title: "The Finished Brandmark & Palette",
        description: "The resolved insignia delivers quiet authority, striking high contrast, and adaptable poise in dark luxury environments.",
        images: [sampleImages.design.logoProject.finalIdentity]
      },
      {
        step: "07 — APPLICATIONS",
        title: "Real-World Mockups & Digital Touchpoints",
        description: "Showcasing the brand across debossed luxury stationery, digital mobile UI, packaging seals, and tactile finishes.",
        images: [sampleImages.design.logoProject.applications]
      }
    ],
    featured: true,
    status: "published",
    publishedAt: "2026-01-05T14:00:00Z",
    createdAt: "2026-01-05T14:00:00Z",
    updatedAt: "2026-01-05T14:00:00Z"
  },
  // 7. Poster Design 1 (Section 17: Multi-format presentation)
  {
    id: "proj-7",
    slug: "northern-derby-matchday-poster",
    title: "Northern Championship",
    subtitle: "Sports Event Key Visual · 2026",
    type: "design",
    category: "poster",
    categoryName: "Poster Design",
    year: "2026",
    location: "Jaffna",
    description: "High-impact sports event poster featuring dynamic typographic contrast, textured athletic imagery, and multi-format adaptations.",
    coverImage: sampleImages.design.posterProject1.main,
    images: [
      { id: "img-p1-1", projectId: "proj-7", url: sampleImages.design.posterProject1.main, altText: "Main Matchday Poster", sortOrder: 0 },
      { id: "img-p1-2", projectId: "proj-7", url: sampleImages.design.posterProject1.alternate, altText: "Alternate Edition Poster", sortOrder: 1 },
    ],
    posterFormats: {
      mainPoster: sampleImages.design.posterProject1.main,
      instagramPost: sampleImages.design.posterProject1.instagram,
      storyFormat: sampleImages.design.posterProject1.story,
      alternateVersion: sampleImages.design.posterProject1.alternate
    },
    featured: true,
    status: "published",
    publishedAt: "2026-01-02T11:00:00Z",
    createdAt: "2026-01-02T11:00:00Z",
    updatedAt: "2026-01-02T11:00:00Z"
  },
  // 8. Poster Design 2
  {
    id: "proj-8",
    slug: "synth-wave-music-poster",
    title: "Vibrations & Echoes",
    subtitle: "Festival Poster · 2026",
    type: "design",
    category: "poster",
    categoryName: "Poster Design",
    year: "2026",
    location: "Colombo",
    description: "Editorial music festival poster experimenting with Swiss modernist layout principles, expressive headline hierarchy, and bold negative space.",
    coverImage: sampleImages.design.posterProject2.main,
    images: [
      { id: "img-p2-1", projectId: "proj-8", url: sampleImages.design.posterProject2.main, altText: "Festival Poster", sortOrder: 0 },
      { id: "img-p2-2", projectId: "proj-8", url: sampleImages.design.posterProject2.alternate, altText: "Night Edition Poster", sortOrder: 1 },
    ],
    posterFormats: {
      mainPoster: sampleImages.design.posterProject2.main,
      instagramPost: sampleImages.design.posterProject2.instagram,
      storyFormat: sampleImages.design.posterProject2.story,
      alternateVersion: sampleImages.design.posterProject2.alternate
    },
    featured: false,
    status: "published",
    publishedAt: "2025-12-20T10:00:00Z",
    createdAt: "2025-12-20T10:00:00Z",
    updatedAt: "2025-12-20T10:00:00Z"
  }
];

export interface ServiceItem {
  id: string;
  type: 'photography' | 'design';
  title: string;
  categorySlug: string;
  tagline: string;
  description: string;
  ctaText: string;
  whatsappMessage: string;
  deliverables: string[];
}

export const servicesList: ServiceItem[] = [
  // Photography Services
  {
    id: "serv-1",
    type: "photography",
    title: "Graduation Photography",
    categorySlug: "graduation",
    tagline: "Academic Milestones & Individual Portraiture",
    description: "Commemorating university convocation achievements with cinematic individual portraits, group camaraderie, and timeless celebratory visuals.",
    ctaText: "PLAN YOUR GRADUATION SHOOT →",
    whatsappMessage: "Hi, I'm interested in a graduation photography shoot with LATEST PHOTOGRAPHY.",
    deliverables: ["High-resolution edited photographs", "Individual & family portrait sessions", "Fast digital turnaround", "Print-ready curation"]
  },
  {
    id: "serv-2",
    type: "photography",
    title: "Event Photography",
    categorySlug: "events",
    tagline: "Candid Documentaries & Cultural Gatherings",
    description: "Atmospheric storytelling capturing genuine emotions, subtle interactions, and the complete rhythm of your special celebration.",
    ctaText: "ENQUIRE FOR YOUR EVENT →",
    whatsappMessage: "Hi, I'd like to enquire about event photography for an upcoming celebration.",
    deliverables: ["Complete event timeline coverage", "Candid moments & key stage highlights", "Curated visual story archive", "Optimized social sharing gallery"]
  },
  {
    id: "serv-3",
    type: "photography",
    title: "Portrait Photography",
    categorySlug: "portrait",
    tagline: "Editorial & Character-Driven Portraits",
    description: "Authentic, evocative portrait sessions focused on natural expression, cinematic lighting, and distinctive personal presence.",
    ctaText: "BOOK A PORTRAIT SESSION →",
    whatsappMessage: "Hi Jeyantha, I'd like to book an editorial portrait photography session.",
    deliverables: ["Location or studio natural lighting", "Art-directed posing & guidance", "Master-retouched signature portraits", "High-res & web-optimized masters"]
  },
  {
    id: "serv-4",
    type: "photography",
    title: "Kovil Event Photography",
    categorySlug: "kovil-events",
    tagline: "Sacred Devotion & Traditional Heritage",
    description: "Respectful, culturally attuned coverage of temple poojas, festivals, and time-honored devotional ceremonies.",
    ctaText: "ENQUIRE FOR COVERAGE →",
    whatsappMessage: "Hi, I would like to enquire about kovil event / religious ceremony coverage.",
    deliverables: ["Respectful ceremonial coverage", "Vibrant ritual & night illumination photography", "Preserved cultural heritage documentation"]
  },
  {
    id: "serv-5",
    type: "photography",
    title: "Sports Event Photography",
    categorySlug: "sports",
    tagline: "High-Speed Action & Athletic Decisive Moments",
    description: "Sharp, high-tempo sports coverage freezing athletic intensity, tactical plays, and celebratory victory moments.",
    ctaText: "ENQUIRE FOR COVERAGE →",
    whatsappMessage: "Hi, I'd like to discuss sports event photography coverage.",
    deliverables: ["High-speed burst action captures", "Player & team victory highlights", "Rapid media turnaround for press & social"]
  },
  // Design Services
  {
    id: "serv-6",
    type: "design",
    title: "Logo Design",
    categorySlug: "logo",
    tagline: "Strategic Brandmarks & Identity Systems",
    description: "Crafting enduring, distinctive brand emblems through research, thoughtful sketching, geometric refinement, and practical application.",
    ctaText: "START A BRAND PROJECT →",
    whatsappMessage: "Hi, I'd like to discuss a logo design and brand identity project with you.",
    deliverables: ["Comprehensive 7-stage design process", "Vector master files (SVG, EPS, PNG)", "Brand usage guidelines", "Real-world mockup applications"]
  },
  {
    id: "serv-7",
    type: "design",
    title: "Poster / Social Media Design",
    categorySlug: "poster",
    tagline: "Key Visuals, Matchday Graphics & Social Formats",
    description: "Editorial, visually arresting posters for events, tournaments, and digital campaigns that command immediate attention.",
    ctaText: "DISCUSS A POSTER →",
    whatsappMessage: "Hi, I'd like to discuss a poster or social media key visual design project.",
    deliverables: ["Print-ready master posters", "Optimized Instagram 4:5 & 1:1 formats", "Story format 9:16 adaptations", "Source file packages"]
  }
];

export function buildWhatsAppLink(number: string, message: string): string {
  const cleanNumber = number.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
}
