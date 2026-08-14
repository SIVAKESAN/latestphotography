import { siteSettings } from "@/config/siteContent";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://latestphotography.lk/#organization",
        "name": siteSettings.brandName,
        "alternateName": "Latest Photography Sri Lanka",
        "url": "https://latestphotography.lk",
        "logo": siteSettings.seo.ogImage,
        "image": siteSettings.seo.ogImage,
        "description": siteSettings.seo.metaDescription,
        "founder": {
          "@type": "Person",
          "name": siteSettings.founderName,
          "jobTitle": "Photographer & Visual Designer",
          "description": siteSettings.founderBioShort
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jaffna",
          "addressRegion": "Northern Province",
          "addressCountry": "LK"
        },
        "areaServed": [
          { "@type": "City", "name": "Jaffna" },
          { "@type": "City", "name": "Kilinochchi" },
          { "@type": "City", "name": "Colombo" },
          { "@type": "AdministrativeArea", "name": "Northern Province" }
        ],
        "sameAs": [
          siteSettings.contact.instagramUrl
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://latestphotography.lk/#website",
        "url": "https://latestphotography.lk",
        "name": siteSettings.brandName,
        "description": siteSettings.tagline,
        "publisher": {
          "@id": "https://latestphotography.lk/#organization"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
