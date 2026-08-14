import { DataService } from '@/lib/dataService';
import Hero from '@/components/home/Hero';
import BrandStatement from '@/components/home/BrandStatement';
import FeaturedStories from '@/components/home/FeaturedStories';
import PhotographyShowcase from '@/components/home/PhotographyShowcase';
import DesignShowcase from '@/components/home/DesignShowcase';
import AboutPreview from '@/components/home/AboutPreview';
import ServicesSection from '@/components/home/ServicesSection';
import InstagramSection from '@/components/home/InstagramSection';
import FinalCTA from '@/components/home/FinalCTA';

export default async function HomePage() {
  const featuredProjects = await DataService.getFeaturedProjects();

  return (
    <div className="w-full bg-white">
      {/* 01 — HERO */}
      <Hero />

      {/* 02 — BRAND STATEMENT */}
      <BrandStatement />

      {/* 03 — FEATURED STORIES */}
      <FeaturedStories projects={featuredProjects} />

      {/* 04 — PHOTOGRAPHY */}
      <PhotographyShowcase />

      {/* 05 — DESIGN */}
      <DesignShowcase />

      {/* 06 — ABOUT */}
      <AboutPreview />

      {/* 07 — SERVICES */}
      <ServicesSection />

      {/* 08 — INSTAGRAM */}
      <InstagramSection />

      {/* 09 — FINAL CTA */}
      <FinalCTA />
    </div>
  );
}
