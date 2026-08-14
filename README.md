# LATEST PHOTOGRAPHY

**Capturing Moments, Creating Identity.**

A production-quality portfolio website for [LATEST PHOTOGRAPHY](https://latestphotography.lk) — a cinematic photography and visual design practice based in Jaffna, Sri Lanka.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL) with localStorage fallback |
| Font | Inter (Google Fonts) |
| Deployment | Vercel (recommended) |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/latest-photography.git
cd latest-photography
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your Supabase credentials (get them from your [Supabase project dashboard](https://supabase.com/dashboard) → Project Settings → API):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> The website also works **without Supabase** — it falls back to local seed data automatically when the environment variables are not set.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── work/               # Portfolio archive + story routes
│   ├── about/              # Founder story
│   ├── services/           # Commission details
│   ├── contact/            # Contact hub
│   └── admin/              # Protected admin management suite
├── components/
│   ├── home/               # Homepage section components
│   ├── navigation/         # Header, Footer, FullscreenMenu
│   ├── gallery/            # Fullscreen lightbox viewer
│   ├── admin/              # Admin sidebar
│   ├── common/             # WhatsApp button, Icons
│   └── seo/                # JSON-LD structured data
├── config/
│   ├── sampleImages.ts     # Centralized sample image URLs (replace with real photos)
│   └── siteContent.ts      # Brand settings, initial projects, services
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── dataService.ts      # Data layer (Supabase + localStorage fallback)
└── types/
    └── index.ts            # TypeScript data models
supabase/
└── schema.sql              # PostgreSQL database schema
```

---

## Admin Portal

Access the admin suite at `/admin/login`.

The admin system uses client-side localStorage authentication suitable for single-user personal portfolios. For production deployment, connect to Supabase Auth via your project dashboard.

---

## Replacing Sample Images

All development sample images are centralized in [`src/config/sampleImages.ts`](src/config/sampleImages.ts).

To replace them with real photographs:
1. Upload your photos to Supabase Storage (or any CDN)
2. Update the URLs in `sampleImages.ts`

---

## Database Setup

To connect a real Supabase database:
1. Create a project at [supabase.com](https://supabase.com)
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor
3. Add your project URL and anon key to `.env.local`

---

## Deployment

The recommended deployment platform is [Vercel](https://vercel.com):

1. Import this repository on Vercel
2. Set the environment variables in Vercel project settings
3. Deploy

---

## License

All photography content and branding belong to **LATEST PHOTOGRAPHY** (Jeyantha). The codebase is provided for personal portfolio use.
