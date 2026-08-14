import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import JsonLd from "@/components/seo/JsonLd";
import { siteSettings } from "@/config/siteContent";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "LATEST PHOTOGRAPHY — Capturing Moments, Creating Identity",
    template: "%s | LATEST PHOTOGRAPHY"
  },
  description: siteSettings.seo.metaDescription,
  keywords: siteSettings.seo.keywords,
  authors: [{ name: "Jeyantha", url: "https://latestphotography.lk" }],
  creator: "LATEST PHOTOGRAPHY",
  publisher: "LATEST PHOTOGRAPHY",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://latestphotography.lk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://latestphotography.lk",
    title: siteSettings.seo.metaTitle,
    description: siteSettings.seo.metaDescription,
    siteName: "LATEST PHOTOGRAPHY",
    images: [
      {
        url: siteSettings.seo.ogImage,
        width: 1200,
        height: 630,
        alt: "LATEST PHOTOGRAPHY — Capturing Moments, Creating Identity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteSettings.seo.metaTitle,
    description: siteSettings.seo.metaDescription,
    images: [siteSettings.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} light antialiased scroll-smooth`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900 font-sans">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
